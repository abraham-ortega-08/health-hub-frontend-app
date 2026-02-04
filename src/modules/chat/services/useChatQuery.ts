import api from '@/services/axios';
import { useMutation } from '@tanstack/react-query';
import { ChatQueryResponse } from '../types';

export const useChatMutation = () => {
	return useMutation<ChatQueryResponse, Error, FormData>({
		mutationFn: async (formData: FormData) => {
			return api.post('/chat/query', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		mutationKey: ['useChatMutation'],
	});
};
