import React from 'react';
import { Icon } from '@iconify/react';
import { formatFileSize } from '@/modules/knowledge/utils/documentUtils';

interface FileItemProps {
	file: File;
	onRemove: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
	return (
		<div className='flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
			<div className='flex items-center gap-3 flex-1 min-w-0'>
				<div className='flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
					<Icon icon='mdi:file-document' className='w-5 h-5 text-white' />
				</div>
				<div className='flex-1 min-w-0'>
					<p className='text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate'>
						{file.name}
					</p>
					<p className='text-xs text-zinc-600 dark:text-zinc-400'>
						{formatFileSize(file.size)}
					</p>
				</div>
			</div>
			<button
				onClick={onRemove}
				className='flex-shrink-0 p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors'>
				<Icon icon='mdi:close' className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
			</button>
		</div>
	);
};
