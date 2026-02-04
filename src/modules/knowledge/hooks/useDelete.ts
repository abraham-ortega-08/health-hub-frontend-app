import { useState, useCallback } from 'react';
import { useDeleteDocumentsMutation } from '../services/useDocuments';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { extractApiErrorMessage } from '../utils/errorUtils';

interface UseDeleteOptions {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
	confirmMessage?: string;
}

interface UseDeleteReturn {
	isDeleting: boolean;
	deleteDocument: (documentId: string) => Promise<void>;
	deleteDocuments: (documentIds: string[]) => Promise<void>;
}

export const useDelete = (options: UseDeleteOptions = {}): UseDeleteReturn => {
	const {
		onSuccess,
		onError,
		confirmMessage = 'Are you sure you want to delete this document?',
	} = options;

	const [isDeleting, setIsDeleting] = useState(false);
	const queryClient = useQueryClient();
	const deleteMutation = useDeleteDocumentsMutation();

	const deleteDocuments = useCallback(
		async (documentIds: string[]) => {
			if (documentIds.length === 0) return;

			// Confirmación
			if (!confirm(confirmMessage)) {
				return;
			}

			setIsDeleting(true);
			const toastId = toast.loading(
				documentIds.length === 1 
					? 'Deleting document...' 
					: `Deleting ${documentIds.length} documents...`
			);

			try {
				await deleteMutation.mutateAsync(documentIds);

				// Invalidar queries para refrescar la lista
				queryClient.invalidateQueries({ queryKey: ['documents'] });

				toast.update(toastId, {
					render:
						documentIds.length === 1
							? 'Document deleted successfully!'
							: `${documentIds.length} documents deleted successfully!`,
					type: 'success',
					isLoading: false,
					autoClose: 3000,
				});

				// Llamar callback de éxito
				onSuccess?.();
		} catch (error: any) {
			console.error('Delete error:', error);

			const errorMessage = extractApiErrorMessage(
				error,
				'Failed to delete document(s). Please try again.'
			);

			toast.update(toastId, {
				render: errorMessage,
				type: 'error',
				isLoading: false,
				autoClose: 5000,
			});

			// Llamar callback de error
			onError?.(error as Error);
		} finally {
			setIsDeleting(false);
		}
		},
		[confirmMessage, deleteMutation, queryClient, onSuccess, onError]
	);

	const deleteDocument = useCallback(
		async (documentId: string) => {
			await deleteDocuments([documentId]);
		},
		[deleteDocuments]
	);

	return {
		isDeleting,
		deleteDocument,
		deleteDocuments,
	};
};
