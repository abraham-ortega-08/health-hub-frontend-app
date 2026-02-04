import React from 'react';
import { Icon } from '@iconify/react';

interface DropZoneProps {
	isDragging: boolean;
	onDragEnter: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent) => void;
	onDragLeave: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent) => void;
	onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
	isDragging,
	onDragEnter,
	onDragOver,
	onDragLeave,
	onDrop,
	onFileInput,
}) => {
	return (
		<div
			onDragEnter={onDragEnter}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
				isDragging
					? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
					: 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
			}`}>
			<input
				type='file'
				multiple
				onChange={onFileInput}
				className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
				accept='.pdf,.doc,.docx,.txt,.md'
			/>
			<div className='flex flex-col items-center justify-center text-center'>
				<div className='flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4'>
					<Icon icon='mdi:file-document-plus' className='w-8 h-8 text-zinc-600 dark:text-zinc-400' />
				</div>
				<p className='text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1'>
					{isDragging ? 'Drop files here' : 'Drag & drop files here'}
				</p>
				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					or click to browse
				</p>
				<p className='text-xs text-zinc-500 dark:text-zinc-500 mt-2'>
					Supports: PDF, DOC, DOCX, TXT, MD
				</p>
			</div>
		</div>
	);
};
