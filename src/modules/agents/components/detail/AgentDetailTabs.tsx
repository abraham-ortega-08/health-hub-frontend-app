'use client';

import React, { useState } from 'react';
import { Agent } from '../../types';
import { AgentDescription, AgentModelConfig, AgentPromptConfig, AgentMetadata } from './details-tab';
import { AgentDocumentsList } from './documents-tab';

interface AgentDetailTabsProps {
	agent: Agent;
}

type TabId = 'details' | 'documents';

interface Tab {
	id: TabId;
	label: string;
	icon: string;
}

const tabs: Tab[] = [
	{ id: 'details', label: 'Details', icon: 'heroicons:information-circle' },
	{ id: 'documents', label: 'Documents', icon: 'heroicons:document-text' },
];

export const AgentDetailTabs: React.FC<AgentDetailTabsProps> = ({ agent }) => {
	const [activeTab, setActiveTab] = useState<TabId>('details');

	return (
		<div className='space-y-6'>
			{/* Tabs Header */}
			<div className='border-b border-zinc-200 dark:border-zinc-800'>
				<div className='flex gap-2'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`
								relative px-4 py-3 text-sm font-medium transition-colors
								flex items-center gap-2
								${
									activeTab === tab.id
										? 'text-blue-600 dark:text-blue-400'
										: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
								}
							`}>
							<span className='text-base'>{tab.label}</span>
							{activeTab === tab.id && (
								<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400' />
							)}
						</button>
					))}
				</div>
			</div>

			{/* Tabs Content */}
			<div className='min-h-[400px]'>
				{activeTab === 'details' && (
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
				)}

				{activeTab === 'documents' && <AgentDocumentsList agentId={agent.id} />}
			</div>
		</div>
	);
};
