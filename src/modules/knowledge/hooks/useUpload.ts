import { useState, useCallback } from 'react';
import { useUploadDocumentMutation } from '../services/useDocuments';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { extractApiErrorMessage } from '../utils/errorUtils';

interface UseUploadOptions {
	type?: 'FIXED' | 'DYNAMIC';
	userId?: string;
	sessionId?: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

interface UseUploadReturn {
	selectedFiles: File[];
	isUploading: boolean;
	isDragging: boolean;
	handleDragEnter: (e: React.DragEvent) => void;
	handleDragLeave: (e: React.DragEvent) => void;
	handleDragOver: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent) => void;
	handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	removeFile: (index: number) => void;
	clearFiles: () => void;
	uploadFiles: () => Promise<void>;
}

export const useUpload = (options: UseUploadOptions = {}): UseUploadReturn => {
	const {
		type = 'FIXED',
		userId,
		sessionId,
		onSuccess,
		onError,
	} = options;

	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	
	const queryClient = useQueryClient();
	const uploadMutation = useUploadDocumentMutation();

	const handleDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = Array.from(e.dataTransfer.files);
		setSelectedFiles((prev) => [...prev, ...files]);
	}, []);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				const files = Array.from(e.target.files);
				setSelectedFiles((prev) => [...prev, ...files]);
			}
		},
		[]
	);

	const removeFile = useCallback((index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const clearFiles = useCallback(() => {
		setSelectedFiles([]);
	}, []);

	const uploadFiles = useCallback(async () => {
		if (selectedFiles.length === 0) return;

		const toastId = toast.loading('Uploading documents...');

		try {
			// Crear FormData con todos los datos
			const formData = new FormData();
			
			// Agregar archivos
			selectedFiles.forEach((file) => {
				formData.append('files', file);
			});
			
			// Agregar tipo
			formData.append('type', type);
			
			// Agregar userId si existe
			if (userId) {
				formData.append('userId', userId);
			}
			
			// Agregar sessionId si existe
			if (sessionId) {
				formData.append('sessionId', sessionId);
			}

			// Subir archivos
			await uploadMutation.mutateAsync(formData);

			// Invalidar queries para refrescar la lista
			queryClient.invalidateQueries({ queryKey: ['documents'] });

			// Limpiar archivos seleccionados
			setSelectedFiles([]);

			// Mostrar toast de éxito
			toast.update(toastId, {
				render: `${selectedFiles.length} document(s) uploaded successfully!`,
				type: 'success',
				isLoading: false,
				autoClose: 3000,
			});

			// Llamar callback de éxito
			onSuccess?.();
		} catch (error: any) {
			console.error('Upload error:', error);
			
			const errorMessage = extractApiErrorMessage(
				error,
				'Failed to upload documents. Please try again.'
			);
			
			// Mostrar toast de error
			toast.update(toastId, {
				render: errorMessage,
				type: 'error',
				isLoading: false,
				autoClose: 5000,
			});

			// Llamar callback de error
			onError?.(error as Error);
		}
	}, [selectedFiles, type, userId, sessionId, uploadMutation, queryClient, onSuccess, onError]);

	return {
		selectedFiles,
		isUploading: uploadMutation.isPending,
		isDragging,
		handleDragEnter,
		handleDragLeave,
		handleDragOver,
		handleDrop,
		handleFileInput,
		removeFile,
		clearFiles,
		uploadFiles,
	};
};
