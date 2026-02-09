'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import { AgentList } from '@/modules/agents';
import { useAgents } from '@/modules/agents/services';

const AiAgentsClient = () => {
	const { data, isLoading } = useAgents({ page: 1, limit: 20 });

	return (
		<PageWrapper>
			<Container>
				<div className='space-y-6 px-4 md:px-6 lg:px-8'>
					{/* Header Section */}
					<div className='space-y-4'>
						<div className='flex items-center justify-between gap-4'>
							{/* Left side - Title and Description */}
							<div className='space-y-2 flex-1'>
								<div className='flex items-center gap-3'>
									<div className='flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'>
										<Icon icon='heroicons:cpu-chip' className='w-6 h-6 text-white' />
									</div>
									<div>
										<h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent'>
											AI Agents
										</h1>
									</div>
								</div>
								<p className='text-sm text-zinc-600 dark:text-zinc-400 pl-14'>
									Select an agent to view details and configuration
								</p>
							</div>
						</div>

						{/* Divider */}
						<div className='h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent'></div>
					</div>

					{/* Stats Bar */}
					{data && !isLoading && (
						<div className='flex items-center gap-4 pb-2'>
							<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
								<span className='text-sm text-zinc-600 dark:text-zinc-400'>
									{data.total} agents available
								</span>
							</div>
						</div>
					)}

					{/* Agents Grid */}
					<AgentList agents={data?.items || []} isLoading={isLoading} />
				</div>
			</Container>
		</PageWrapper>
	);
};

export default AiAgentsClient;