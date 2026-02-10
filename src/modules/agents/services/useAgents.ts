import api from '@/services/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	AgentsResponse,
	AgentsQueryParams,
	Agent,
	AgentDocumentsResponse,
	AgentDocumentsQueryParams,
} from '../types';

export const useAgents = (params?: AgentsQueryParams) => {
	return useQuery<AgentsResponse>({
		queryKey: ['agents', params],
		queryFn: () => api.get('/agents', { params }),
	});
};

export const useAgent = (id: string) => {
	return useQuery<Agent>({
		queryKey: ['agent', id],
		queryFn: () => api.get(`/agents/${id}`),
		enabled: !!id,
	});
};

export const useAgentDocuments = (agentId: string, params?: AgentDocumentsQueryParams) => {
	return useQuery<AgentDocumentsResponse>({
		queryKey: ['agentDocuments', agentId, params],
		queryFn: () => api.get(`/agents/${agentId}/documents`, { params }),
		enabled: !!agentId,
	});
};

export const useUpdateAgent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: string; payload: Partial<Agent> }) =>
			api.patch(`/agents/${data.id}`, data.payload),
		mutationKey: ['updateAgent'],
		onSuccess: (_, variables) => {
			// Invalidate and refetch the specific agent
			queryClient.invalidateQueries({ queryKey: ['agent', variables.id] });
			// Optionally invalidate the agents list
			queryClient.invalidateQueries({ queryKey: ['agents'] });
		},
	});
};
