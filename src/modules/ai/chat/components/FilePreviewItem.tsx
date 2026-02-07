import React, { FC } from 'react';
import { Icon } from '@iconify/react';

interface FilePreviewItemProps {
	file: File;
	onRemove: () => void;
}

const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const FilePreviewItem: FC<FilePreviewItemProps> = ({ file, onRemove }) => {
	return (
		<div className='flex items-center gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 px-3 py-2 border border-zinc-200 dark:border-zinc-700'>
			<Icon icon='mdi:file-document' className='w-4 h-4 text-blue-500 flex-shrink-0' />
			<div className='flex-1 min-w-0'>
				<p className='text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate'>
					{file.name}
				</p>
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					{formatFileSize(file.size)}
				</p>
			</div>
			<button
				onClick={onRemove}
				type='button'
				className='flex-shrink-0 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors'>
				<Icon icon='mdi:close' className='w-3 h-3 text-zinc-600 dark:text-zinc-400' />
			</button>
		</div>
	);
};

export default FilePreviewItem;
