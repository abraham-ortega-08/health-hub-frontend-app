import React from 'react';
import { FileItem } from './FileItem';

interface FileListProps {
	files: File[];
	onRemove: (index: number) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
	if (files.length === 0) return null;

	return (
		<div className='space-y-2'>
			<p className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
				Selected Files ({files.length})
			</p>
			<div className='space-y-2 max-h-64 overflow-y-auto'>
				{files.map((file, index) => (
					<FileItem key={index} file={file} onRemove={() => onRemove(index)} />
				))}
			</div>
		</div>
	);
};
