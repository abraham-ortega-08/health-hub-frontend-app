import api from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { AgentsResponse, AgentsQueryParams, Agent } from '../types';

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
