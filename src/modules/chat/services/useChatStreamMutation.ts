import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { streamingService, StreamCallbacks, StreamConfig } from './streamingService';
import { ProgressInfo, DocumentReference, UploadedFile } from '../types';

export interface StreamingRequest {
	formData: FormData;
	callbacks: StreamCallbacks;
	config?: StreamConfig;
}

export interface StreamingResponse {
	success: boolean;
	streamId: string | null;
}

export interface StreamingError {
	message: string;
	code?: string;
}

/**
 * Hook de TanStack Query para manejar streaming de chat con SSE
 * Proporciona estados optimizados y cacheo automático
 */
export const useChatStreamMutation = (
	options?: Omit<
		UseMutationOptions<StreamingResponse, StreamingError, StreamingRequest>,
		'mutationFn'
	>
) => {
	return useMutation<StreamingResponse, StreamingError, StreamingRequest>({
		mutationFn: async ({ formData, callbacks, config }) => {
			try {
				await streamingService.startStream(formData, callbacks, config);
				
				return {
					success: true,
					streamId: streamingService.getActiveStreamId(),
				};
			} catch (error: any) {
				throw {
					message: error?.message || 'Streaming failed',
					code: error?.code || 'STREAM_ERROR',
				};
			}
		},
		mutationKey: ['chatStream'],
		...options,
	});
};

/**
 * Hook para cancelar un stream activo
 */
export const useCancelStreamMutation = (
	options?: Omit<
		UseMutationOptions<boolean, StreamingError, string | undefined>,
		'mutationFn'
	>
) => {
	return useMutation<boolean, StreamingError, string | undefined>({
		mutationFn: async (streamId) => {
			try {
				const success = await streamingService.cancelStream(streamId);
				return success;
			} catch (error: any) {
				throw {
					message: error?.message || 'Failed to cancel stream',
					code: 'CANCEL_ERROR',
				};
			}
		},
		mutationKey: ['cancelStream'],
		...options,
	});
};
