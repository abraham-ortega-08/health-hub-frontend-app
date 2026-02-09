'use client';

import React from 'react';
import { Agent } from '../types';
import { AgentCard } from './AgentCard';
import { AgentListLoading } from './AgentListLoading';
import { AgentListEmpty } from './AgentListEmpty';

interface AgentListProps {
	agents: Agent[];
	isLoading: boolean;
}

export const AgentList: React.FC<AgentListProps> = ({ agents, isLoading }) => {
	if (isLoading) {
		return <AgentListLoading />;
	}

	if (agents.length === 0) {
		return <AgentListEmpty />;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{agents.map((agent) => (
				<AgentCard key={agent.id} agent={agent} />
			))}
		</div>
	);
};
