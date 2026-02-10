'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { FieldConfig } from '../../../utils/fieldConfig';
import { FIELD_PLACEHOLDERS, TEXTAREA_ROWS } from '../../../const';

interface DynamicRecordFieldProps {
	value: Record<string, any>;
	onChange: (value: Record<string, any>) => void;
	fieldConfig: FieldConfig;
}

export const DynamicRecordField: React.FC<DynamicRecordFieldProps> = ({
	value = {},
	onChange,
	fieldConfig,
}) => {
	const [newKey, setNewKey] = useState('');
	const existingKeys = Object.keys(value);

	const addNewKey = () => {
		const trimmedKey = newKey.trim();
		if (trimmedKey && !existingKeys.includes(trimmedKey)) {
			onChange({
				...value,
				[trimmedKey]: '',
			});
			setNewKey('');
		}
	};

	const removeKey = (key: string) => {
		const newValue = { ...value };
		delete newValue[key];
		onChange(newValue);
	};

	const updateKeyValue = (key: string, newValue: string) => {
		onChange({
			...value,
			[key]: newValue,
		});
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addNewKey();
		}
	};

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between mb-2'>
				<label className='text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
					{fieldConfig.label}
				</label>
			</div>

			{fieldConfig.description && (
				<p className='text-xs text-zinc-500 dark:text-zinc-400 mb-3'>
					{fieldConfig.description}
				</p>
			)}

			{/* Existing keys */}
			<div className='space-y-3'>
				{existingKeys.map((key) => (
					<div
						key={key}
						className='border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 bg-zinc-50 dark:bg-zinc-800/50'>
						<div className='flex items-start justify-between gap-2 mb-2'>
							<label className='text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wide'>
								{key}
							</label>
							<button
								type='button'
								onClick={() => removeKey(key)}
								className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors'>
								<Icon icon='heroicons:x-mark' className='w-5 h-5' />
							</button>
						</div>
						<textarea
							value={typeof value[key] === 'string' ? value[key] : JSON.stringify(value[key], null, 2)}
							onChange={(e) => updateKeyValue(key, e.target.value)}
							rows={TEXTAREA_ROWS.PROMPT_VALUE}
							className='w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
							placeholder={FIELD_PLACEHOLDERS.KEY_VALUE}
						/>
					</div>
				))}
			</div>

			{/* Add new key interface */}
			<div className='mt-4 p-4 border border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-800/30'>
				<div className='flex gap-2'>
					<input
						type='text'
						placeholder={FIELD_PLACEHOLDERS.NEW_KEY_NAME}
						value={newKey}
						onChange={(e) => setNewKey(e.target.value.toUpperCase().replace(/\s/g, '_'))}
						onKeyPress={handleKeyPress}
						className='flex-1 px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
					/>
					<button
						type='button'
						onClick={addNewKey}
						disabled={!newKey.trim()}
						className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2'>
						<Icon icon='heroicons:plus' className='w-4 h-4' />
						Add Field
					</button>
				</div>
				<p className='mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
					Type a key name and press Enter or click Add Field
				</p>
			</div>
		</div>
	);
};
