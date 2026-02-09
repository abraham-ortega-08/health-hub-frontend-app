'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import { useAgent } from '@/modules/agents/services';
import {
	AgentDetailHeader,
	AgentDetailLoading,
	AgentDetailNotFound,
	AgentDetailTabs,
} from '@/modules/agents/components/detail';

const AgentDetailClient = () => {
	const params = useParams();
	const agentId = params.id as string;
	const { data: agent, isLoading } = useAgent(agentId);

	if (isLoading) {
		return <AgentDetailLoading />;
	}

	if (!agent) {
		return <AgentDetailNotFound />;
	}

	return (
		<PageWrapper>
			<AgentDetailHeader agent={agent} />
			<Container>
				<AgentDetailTabs agent={agent} />
			</Container>
		</PageWrapper>
	);
};

export default AgentDetailClient;
