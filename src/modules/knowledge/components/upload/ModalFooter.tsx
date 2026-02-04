import React from 'react';
import { Icon } from '@iconify/react';

interface ModalFooterProps {
	onCancel: () => void;
	onUpload: () => void;
	isUploading: boolean;
	filesCount: number;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
	onCancel,
	onUpload,
	isUploading,
	filesCount,
}) => {
	return (
		<div className='flex items-center justify-end gap-3 p-6 border-t border-zinc-200 dark:border-zinc-800'>
			<button
				onClick={onCancel}
				disabled={isUploading}
				className='px-4 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
				Cancel
			</button>
			<button
				onClick={onUpload}
				disabled={filesCount === 0 || isUploading}
				className='px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'>
				{isUploading ? (
					<>
						<Icon icon='mdi:loading' className='animate-spin h-4 w-4 text-white' />
						Uploading...
					</>
				) : (
					<>Upload {filesCount > 0 && `(${filesCount})`}</>
				)}
			</button>
		</div>
	);
};
