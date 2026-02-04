import { useCallback } from 'react';
import { useChatStore } from '../store';
import { useChatMutation } from '../services';
import { useFileUpload } from './useFileUpload';
import { toast } from 'react-toastify';
import { Message } from '../types';

interface UseChatOptions {
	userId?: string;
}

export const useChat = (options: UseChatOptions = {}) => {
	const { userId } = options;
	const { currentSessionId, getCurrentSession, addMessage, createSession } = useChatStore();
	const chatMutation = useChatMutation();
	const { selectedFiles, addFiles, removeFile, clearFiles } = useFileUpload();

	const sendMessage = useCallback(
		async (question: string) => {
			if (!question.trim()) return;
			
			let sessionId = currentSessionId;
			if (!sessionId) {
				sessionId = createSession();
			}

			const userMessage: Message = {
				id: crypto.randomUUID(),
				content: question,
				isAnswer: false,
				timestamp: Date.now(),
			};

			addMessage(sessionId, userMessage);

			try {
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

				const response = await chatMutation.mutateAsync(formData);

				const aiMessage: Message = {
					id: crypto.randomUUID(),
					content: response.answer,
					isAnswer: true,
					timestamp: Date.now(),
				};

				addMessage(sessionId, aiMessage);
				clearFiles();
			} catch (error: any) {
				console.error('Chat error:', error);

				const errorMessage = error?.response?.data?.message || 'Failed to send message. Please try again.';

				toast.error(errorMessage, {
					autoClose: 5000,
				});
			}
		},
		[currentSessionId, createSession, userId, selectedFiles, addMessage, chatMutation, clearFiles]
	);

	return {
		currentSession: getCurrentSession(),
		sendMessage,
		isLoading: chatMutation.isPending,
		selectedFiles,
		addFiles,
		removeFile,
		clearFiles,
	};
};
