import React, { FC } from 'react';
import FilePreviewItem from './FilePreviewItem';
import Button from '@/components/ui/Button';

interface FilePreviewProps {
	files: File[];
	onRemove: (index: number) => void;
	onClearAll: () => void;
}

const FilePreview: FC<FilePreviewProps> = ({ files, onRemove, onClearAll }) => {
	if (files.length === 0) return null;

	return (
		<div className='mb-3'>
			<div className='flex items-center justify-between mb-2'>
				<p className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
					{files.length} file{files.length > 1 ? 's' : ''} selected
				</p>
				<Button
					size='xs'
					variant='outline'
					onClick={onClearAll}
					icon='heroicons:x-mark'>
					Clear all
				</Button>
			</div>
			<div className='flex flex-wrap gap-2'>
				{files.map((file, index) => (
					<FilePreviewItem
						key={`${file.name}-${index}`}
						file={file}
						onRemove={() => onRemove(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default FilePreview;
