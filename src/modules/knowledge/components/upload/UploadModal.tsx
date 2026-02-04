'use client';

import React from 'react';
import { useUpload } from '@/modules/knowledge/hooks/useUpload';
import { ModalHeader } from './ModalHeader';
import { DropZone } from './DropZone';
import { FileList } from './FileList';
import { ModalFooter } from './ModalFooter';

interface UploadModalProps {
	isOpen: boolean;
	onClose: () => void;
	type?: 'FIXED' | 'DYNAMIC';
	userId?: string;
	sessionId?: string;
}

export const UploadModal: React.FC<UploadModalProps> = ({
	isOpen,
	onClose,
	type = 'FIXED',
	userId,
	sessionId,
}) => {
	const {
		selectedFiles,
		isUploading,
		isDragging,
		handleDragEnter,
		handleDragLeave,
		handleDragOver,
		handleDrop,
		handleFileInput,
		removeFile,
		uploadFiles,
	} = useUpload({
		type,
		userId,
		sessionId,
		onSuccess: () => {
			onClose();
		},
	});

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={onClose}
			/>
			<div className='relative w-full max-w-2xl mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800'>
				<ModalHeader onClose={onClose} />
				<div className='p-6 space-y-4'>
					<DropZone
						isDragging={isDragging}
						onDragEnter={handleDragEnter}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onFileInput={handleFileInput}
					/>
					<FileList files={selectedFiles} onRemove={removeFile} />
				</div>
				<ModalFooter
					onCancel={onClose}
					onUpload={uploadFiles}
					isUploading={isUploading}
					filesCount={selectedFiles.length}
				/>
			</div>
		</div>
	);
};
