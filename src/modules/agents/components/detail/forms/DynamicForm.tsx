'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { FieldConfig } from '../../../utils/fieldConfig';
import { DynamicRecordField } from './DynamicRecordField';

// Dynamically import MDXEditor to avoid SSR issues
const PromptMarkdownEditor = dynamic(() => import('./PromptMarkdownEditor').then((m) => m.PromptMarkdownEditor), { 
	ssr: false,
	loading: () => <div className="w-full h-[400px] border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">Loading editor...</div>
});

interface DynamicFormProps {
	fields: FieldConfig[];
	initialData: Record<string, any>;
	onSubmit: (values: Record<string, any>) => Promise<void>;
	onCancel: () => void;
	schema?: z.ZodSchema;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
	fields,
	initialData,
	onSubmit,
	onCancel,
	schema,
}) => {
	const form = useForm({
		defaultValues: initialData,
		onSubmit: async ({ value }) => {
			try {
				// Validate with Zod if schema provided
				if (schema) {
					schema.parse(value);
				}
				await onSubmit(value);
			} catch (error) {
				console.error('Form submission error:', error);
				if (error instanceof z.ZodError) {
					// Handle Zod validation errors
					error.errors.forEach((err) => {
						console.error(`${err.path.join('.')}: ${err.message}`);
					});
				}
				throw error;
			}
		},
	});

	const renderField = (fieldConfig: FieldConfig) => {
		// Dynamic Record Type (like prompt_config)
		if (fieldConfig.type === 'dynamic-record') {
			return (
				<form.Field key={fieldConfig.name} name={fieldConfig.name}>
					{(field) => (
						<DynamicRecordField
							value={field.state.value || {}}
							onChange={(newValue) => field.handleChange(newValue)}
							fieldConfig={fieldConfig}
						/>
					)}
				</form.Field>
			);
		}

		// Markdown Type with MDXEditor
		if (fieldConfig.type === 'markdown') {
			return (
				<form.Field key={fieldConfig.name} name={fieldConfig.name}>
					{(field) => {
						return (
							<div className='space-y-2'>
								<label className='flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'>
									{fieldConfig.label}
									{fieldConfig.required && <span className='text-red-500'>*</span>}
								</label>

								{fieldConfig.description && (
									<p className='text-xs text-zinc-500 dark:text-zinc-400 mb-2'>
										{fieldConfig.description}
									</p>
								)}

								{/* MDXEditor */}
								<PromptMarkdownEditor
									value={field.state.value || ''}
									onChange={(newValue) => field.handleChange(newValue)}
									placeholder={fieldConfig.placeholder}
								/>

								<p className='text-xs text-zinc-500 dark:text-zinc-400 italic mt-2'>
									💡 Tip: Use the toolbar to format your text. Supports headings, lists, links, tables, and code blocks.
								</p>

								{/* Validation errors */}
								{field.state.meta.errors && field.state.meta.errors.length > 0 && (
									<p className='text-sm text-red-500 dark:text-red-400 mt-2'>
										{field.state.meta.errors[0]}
									</p>
								)}
							</div>
						);
					}}
				</form.Field>
			);
		}

		// Regular fields rendered dynamically
		return (
			<form.Field key={fieldConfig.name} name={fieldConfig.name}>
				{(field) => (
					<div className='space-y-2'>
						<label className='flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'>
							{fieldConfig.label}
							{fieldConfig.required && <span className='text-red-500'>*</span>}
						</label>

						{fieldConfig.description && (
							<p className='text-xs text-zinc-500 dark:text-zinc-400'>
								{fieldConfig.description}
							</p>
						)}

						{/* Text Input */}
						{fieldConfig.type === 'text' && (
							<input
								type='text'
								value={field.state.value || ''}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder={fieldConfig.placeholder}
								className='w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
							/>
						)}

						{/* Number Input */}
						{fieldConfig.type === 'number' && (
							<input
								type='number'
								value={field.state.value ?? fieldConfig.defaultValue ?? ''}
								onChange={(e) => {
									const value = e.target.value;
									field.handleChange(value === '' ? undefined : Number(value));
								}}
								min={fieldConfig.min}
								max={fieldConfig.max}
								step={fieldConfig.step}
								className='w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
							/>
						)}

						{/* Textarea */}
						{fieldConfig.type === 'textarea' && (
							<textarea
								value={field.state.value || ''}
								onChange={(e) => field.handleChange(e.target.value)}
								rows={fieldConfig.rows}
								placeholder={fieldConfig.placeholder}
								className='w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y'
							/>
						)}

						{/* Select */}
						{fieldConfig.type === 'select' && (
							<select
								value={field.state.value || ''}
								onChange={(e) => field.handleChange(e.target.value)}
								className='w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'>
								<option value=''>Select an option...</option>
								{fieldConfig.options?.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						)}

						{/* Boolean (Checkbox) */}
						{fieldConfig.type === 'boolean' && (
							<label className='flex items-center gap-2 cursor-pointer'>
								<input
									type='checkbox'
									checked={field.state.value || false}
									onChange={(e) => field.handleChange(e.target.checked)}
									className='w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-2 focus:ring-blue-500'
								/>
								<span className='text-sm text-zinc-600 dark:text-zinc-400'>
									{fieldConfig.description || 'Enable this option'}
								</span>
							</label>
						)}

						{/* Validation errors */}
						{field.state.meta.errors && field.state.meta.errors.length > 0 && (
							<p className='text-sm text-red-500 dark:text-red-400'>
								{field.state.meta.errors[0]}
							</p>
						)}
					</div>
				)}
			</form.Field>
		);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className='space-y-6'>
			{/* Render all fields */}
			<div className='space-y-6'>{fields.map(renderField)}</div>

			{/* Form Actions */}
			<div className='flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800'>
				<button
					type='submit'
					disabled={form.state.isSubmitting}
					className='px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg transition-colors'>
					{form.state.isSubmitting ? 'Saving...' : 'Save Changes'}
				</button>
				<button
					type='button'
					onClick={onCancel}
					disabled={form.state.isSubmitting}
					className='px-6 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors'>
					Cancel
				</button>
			</div>
		</form>
	);
};
