import { useCallback, useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store';
import { useChatStreamMutation, useCancelStreamMutation } from '../services/useChatStreamMutation';
import { useFileUpload } from './useFileUpload';
import { toast } from 'react-toastify';
import { Message, ProgressInfo } from '../types';

interface UseStreamingChatOptions {
	userId?: string;
	autoReconnect?: boolean;
	maxReconnectAttempts?: number;
}

/**
 * Hook optimizado para chat con streaming usando TanStack Query
 * Proporciona gestión de estado, caché y manejo de errores automático
 */
export const useStreamingChat = (options: UseStreamingChatOptions = {}) => {
	const { userId, autoReconnect = true, maxReconnectAttempts = 3 } = options;
	
	const { 
		currentSessionId, 
		getCurrentSession, 
		addMessage, 
		createSession,
		appendToMessage,
		setMessageMetadata,
		updateMessage,
	} = useChatStore();
	
	const [progress, setProgress] = useState<ProgressInfo | null>(null);
	const { selectedFiles, addFiles, removeFile, clearFiles } = useFileUpload();
	
	const currentMessageIdRef = useRef<string | null>(null);
	const sessionIdRef = useRef<string | null>(null);
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Mutación para streaming con TanStack Query
	const streamMutation = useChatStreamMutation({
		onSuccess: (data) => {
			console.log('Stream completed successfully:', data);
		},
		onError: (error) => {
			console.error('Stream mutation error:', error);
			handleStreamError(error.message);
		},
	});

	// Mutación para cancelar streams
	const cancelMutation = useCancelStreamMutation({
		onSuccess: () => {
			toast.info('Stream cancelled', { autoClose: 2000 });
		},
		onError: () => {
			toast.warning('Failed to cancel stream', { autoClose: 2000 });
		},
	});

	// Progreso simulado cuando el servidor no envía actualizaciones
	useEffect(() => {
		if (streamMutation.isPending && !progress) {
			// Iniciar con progreso base
			setProgress({
				stage: 'generating',
				percentage: 10,
				message: 'Generating response...'
			});

			// Incrementar progreso gradualmente
			let currentProgress = 10;
			progressIntervalRef.current = setInterval(() => {
				currentProgress += Math.random() * 5;
				if (currentProgress > 95) {
					currentProgress = 95; // Nunca llegar a 100% hasta que termine
				}
				setProgress({
					stage: 'generating',
					percentage: Math.round(currentProgress),
					message: 'Generating response...'
				});
			}, 500);
		} else if (!streamMutation.isPending && progressIntervalRef.current) {
			clearInterval(progressIntervalRef.current);
			progressIntervalRef.current = null;
		}

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
				progressIntervalRef.current = null;
			}
		};
	}, [streamMutation.isPending, progress]);

	const handleStreamError = useCallback((error: string) => {
		if (sessionIdRef.current && currentMessageIdRef.current) {
			updateMessage(
				sessionIdRef.current,
				currentMessageIdRef.current,
				{ 
					isStreaming: false,
					content: `Error: ${error}`
				}
			);
		}
		
		setProgress(null);
		currentMessageIdRef.current = null;
		toast.error(error, { autoClose: 5000 });
	}, [updateMessage]);

	const sendMessage = useCallback(
		async (question: string) => {
			if (!question.trim() || streamMutation.isPending) return;
			
			let sessionId = currentSessionId;
			if (!sessionId) {
				sessionId = createSession();
			}
			sessionIdRef.current = sessionId;

			// Mensaje del usuario
			const userMessage: Message = {
				id: crypto.randomUUID(),
				content: question,
				isAnswer: false,
				timestamp: Date.now(),
			};

			addMessage(sessionId, userMessage);

			// Mensaje AI placeholder para streaming
			const aiMessageId = crypto.randomUUID();
			const aiMessage: Message = {
				id: aiMessageId,
				content: '',
				isAnswer: true,
				timestamp: Date.now(),
				isStreaming: true,
			};

			addMessage(sessionId, aiMessage);
			currentMessageIdRef.current = aiMessageId;
			setProgress(null);

			// Preparar FormData
			const formData = new FormData();
			formData.append('question', question);
			formData.append('sessionId', sessionId);

			if (userId) {
				formData.append('userId', userId);
			}

			if (selectedFiles.length > 0) {
				selectedFiles.forEach((file) => {
					formData.append('files', file);
				});
			}

			// Ejecutar mutación con callbacks
			streamMutation.mutate({
				formData,
				callbacks: {
					onStreamStart: (streamId) => {
						console.log('Stream started:', streamId);
					},
					
					onProgress: (progressInfo) => {
						// Limpiar intervalo si recibimos progreso real del servidor
						if (progressIntervalRef.current) {
							clearInterval(progressIntervalRef.current);
							progressIntervalRef.current = null;
						}
						setProgress(progressInfo);
					},
					
					onMetadata: (documents, uploadedFiles) => {
						if (sessionIdRef.current && currentMessageIdRef.current) {
							setMessageMetadata(
								sessionIdRef.current,
								currentMessageIdRef.current,
								documents,
								uploadedFiles
							);
						}
					},
					
					onChunk: (content) => {
						if (sessionIdRef.current && currentMessageIdRef.current) {
							appendToMessage(
								sessionIdRef.current,
								currentMessageIdRef.current,
								content
							);
						}
					},
					
					onComplete: () => {
						if (progressIntervalRef.current) {
							clearInterval(progressIntervalRef.current);
							progressIntervalRef.current = null;
						}
						if (sessionIdRef.current && currentMessageIdRef.current) {
							updateMessage(
								sessionIdRef.current,
								currentMessageIdRef.current,
								{ isStreaming: false }
							);
						}
						setProgress(null);
						clearFiles();
						currentMessageIdRef.current = null;
					},
					
					onCancelled: () => {
						if (progressIntervalRef.current) {
							clearInterval(progressIntervalRef.current);
							progressIntervalRef.current = null;
						}
						if (sessionIdRef.current && currentMessageIdRef.current) {
							const session = getCurrentSession();
							const currentContent = session?.messages
								.find(m => m.id === currentMessageIdRef.current)?.content || '';
							
							updateMessage(
								sessionIdRef.current,
								currentMessageIdRef.current,
								{ 
									isStreaming: false,
									content: currentContent || '[Cancelled]'
								}
							);
						}
						setProgress(null);
						currentMessageIdRef.current = null;
						toast.info('Stream cancelled', { autoClose: 2000 });
					},
					
					onError: handleStreamError,
				},
				config: {
					autoReconnect,
					maxReconnectAttempts,
					reconnectDelay: 2000,
				},
			});
		},
		[
			currentSessionId,
			createSession,
			userId,
			selectedFiles,
			streamMutation,
			addMessage,
			appendToMessage,
			setMessageMetadata,
			updateMessage,
			clearFiles,
			autoReconnect,
			maxReconnectAttempts,
			getCurrentSession,
			handleStreamError,
		]
	);

	const cancelStream = useCallback(async () => {
		if (progressIntervalRef.current) {
			clearInterval(progressIntervalRef.current);
			progressIntervalRef.current = null;
		}
		cancelMutation.mutate(undefined);
	}, [cancelMutation]);

	return {
		currentSession: getCurrentSession(),
		sendMessage,
		cancelStream,
		isStreaming: streamMutation.isPending,
		progress,
		selectedFiles,
		addFiles,
		removeFile,
		clearFiles,
		// Estados adicionales de TanStack Query
		isError: streamMutation.isError,
		error: streamMutation.error,
		isSuccess: streamMutation.isSuccess,
	};
};
