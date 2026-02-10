'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { FieldConfig } from '../../utils/fieldConfig';
import { DynamicForm } from './forms/DynamicForm';

// Dynamically import AceEditor to avoid SSR issues
const AceEditor = dynamic(
	async () => {
		const ace = await import('react-ace');
		await import('ace-builds/src-noconflict/mode-json');
		await import('ace-builds/src-noconflict/theme-github');
		await import('ace-builds/src-noconflict/theme-monokai');
		await import('ace-builds/src-noconflict/ext-language_tools');
		return ace;
	},
	{ ssr: false },
);

interface EditableSectionProps {
	title: string;
	fields: FieldConfig[];
	initialData: Record<string, any>;
	schema: z.ZodSchema;
	onSave: (values: Record<string, any>) => Promise<void>;
	ViewComponent: React.FC<any>;
}

type EditMode = 'view' | 'form' | 'json';

export const EditableSection: React.FC<EditableSectionProps> = ({
	title,
	fields,
	initialData,
	schema,
	onSave,
	ViewComponent,
}) => {
	const [mode, setMode] = useState<EditMode>('view');
	const [jsonValue, setJsonValue] = useState('');
	const [jsonError, setJsonError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Detect dark mode
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsDarkMode(document.documentElement.classList.contains('dark'));

			// Optional: Watch for theme changes
			const observer = new MutationObserver(() => {
				setIsDarkMode(document.documentElement.classList.contains('dark'));
			});

			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class'],
			});

			return () => observer.disconnect();
		}
	}, []);

	const handleFormSubmit = async (values: Record<string, any>) => {
		setIsSaving(true);
		try {
			await onSave(values);
			setMode('view');
		} catch (error) {
			console.error('Save error:', error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleJsonSave = async () => {
		setJsonError(null);
		setIsSaving(true);

		try {
			// Parse JSON
			const parsed = JSON.parse(jsonValue);

			// Validate with Zod schema
			const validated = schema.parse(parsed);

			// Save
			await onSave(validated);
			setMode('view');
		} catch (error) {
			if (error instanceof SyntaxError) {
				setJsonError(`Invalid JSON syntax: ${error.message}`);
			} else if (error instanceof z.ZodError) {
				const errorMessages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
				setJsonError(`Validation errors:\n${errorMessages.join('\n')}`);
			} else {
				setJsonError('An error occurred while saving');
			}
		} finally {
			setIsSaving(false);
		}
	};

	const handleEditClick = () => {
		setMode('form');
	};

	const handleCancel = () => {
		setMode('view');
		setJsonError(null);
		setJsonValue('');
	};

	const switchToJson = () => {
		setJsonValue(JSON.stringify(initialData, null, 2));
		setJsonError(null);
		setMode('json');
	};

	const switchToForm = () => {
		setJsonError(null);
		setMode('form');
	};

	return (
		<div className='bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800'>
			{/* Section Header */}
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'>{title}</h2>

				{mode === 'view' && (
					<button
						onClick={handleEditClick}
						className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors'>
						<Icon icon='heroicons:pencil-square' className='w-4 h-4' />
						Edit
					</button>
				)}
			</div>

			{/* View Mode */}
			{mode === 'view' && <ViewComponent {...initialData} />}

			{/* Edit Mode (Form or JSON) */}
			{mode !== 'view' && (
				<div className='space-y-4'>
					{/* Mode Toggle */}
					<div className='flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit'>
						<button
							type='button'
							onClick={switchToForm}
							className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
								mode === 'form'
									? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
									: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
							}`}>
							<Icon icon='heroicons:document-text' className='w-4 h-4 inline mr-1' />
							Form
						</button>
						<button
							type='button'
							onClick={switchToJson}
							className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
								mode === 'json'
									? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
									: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
							}`}>
							<Icon icon='heroicons:code-bracket' className='w-4 h-4 inline mr-1' />
							JSON
						</button>
					</div>

					{/* Form Mode */}
					{mode === 'form' && (
						<DynamicForm
							fields={fields}
							initialData={initialData}
							onSubmit={handleFormSubmit}
							onCancel={handleCancel}
							schema={schema}
						/>
					)}

					{/* JSON Mode */}
					{mode === 'json' && (
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2'>
									JSON Editor
								</label>
								<div className='border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden'>
									<AceEditor
										mode='json'
										theme={isDarkMode ? 'monokai' : 'github'}
										value={jsonValue}
										onChange={(value) => {
											setJsonValue(value);
											setJsonError(null);
										}}
										name='json-editor'
										editorProps={{ $blockScrolling: true }}
										setOptions={{
											enableBasicAutocompletion: true,
											enableLiveAutocompletion: true,
											enableSnippets: false,
											showLineNumbers: true,
											tabSize: 2,
											useWorker: false,
										}}
										style={{
											width: '100%',
											height: '400px',
											fontSize: '14px',
										}}
									/>
								</div>
								<p className='mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
									Edit the JSON directly. Make sure it's valid JSON format.
								</p>
							</div>

							{/* JSON Error Display */}
							{jsonError && (
								<div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
									<div className='flex items-start gap-2'>
										<Icon
											icon='heroicons:exclamation-triangle'
											className='w-5 h-5 text-red-500 dark:text-red-400 mt-0.5'
										/>
										<pre className='text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono'>
											{jsonError}
										</pre>
									</div>
								</div>
							)}

							{/* JSON Actions */}
							<div className='flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800'>
								<button
									onClick={handleJsonSave}
									disabled={isSaving}
									className='px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg transition-colors'>
									{isSaving ? 'Saving...' : 'Save Changes'}
								</button>
								<button
									onClick={handleCancel}
									disabled={isSaving}
									className='px-6 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors'>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
