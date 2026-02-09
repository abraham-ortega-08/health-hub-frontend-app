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
	AgentDescription,
	AgentModelConfig,
	AgentPromptConfig,
	AgentMetadata,
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
				<div className='grid gap-6'>
					<AgentDescription description={agent.description} />
					<AgentModelConfig modelConfig={agent.model_config} />
					<AgentPromptConfig promptConfig={agent.prompt_config} />
					<AgentMetadata
						createdBy={agent.created_by}
						createdAt={agent.created_at}
						updatedAt={agent.updated_at}
					/>
				</div>
			</Container>
		</PageWrapper>
	);
};

export default AgentDetailClient;
