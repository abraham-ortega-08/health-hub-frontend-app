'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Agent } from '../../types';
import { AgentDescription, AgentModelConfig, AgentPromptConfig, AgentMetadata } from './details-tab';
import { AgentDocumentsList } from './documents-tab';
import { EditableSection } from './EditableSection';
import { BASIC_INFO_FIELDS, MODEL_CONFIG_FIELDS, PROMPT_CONFIG_FIELD } from '../../utils/fieldConfig';
import { basicInfoSchema, modelConfigSchema, promptConfigSchema } from '../../validation/agentSchemas';
import { useUpdateAgent } from '../../services/useAgents';

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
	const updateMutation = useUpdateAgent();

	const handleSave = async (section: string, values: Record<string, any>) => {
		try {
			await updateMutation.mutateAsync({
				id: agent.id,
				payload: { [section]: values } as Partial<Agent>,
			});

			toast.success('Changes saved successfully!');
		} catch (error: any) {
			console.error('Save error:', error);
			toast.error(error?.message || 'Failed to save changes');
			throw error;
		}
	};

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
						{/* Basic Information - Editable */}
						<EditableSection
							title='Basic Information'
							fields={BASIC_INFO_FIELDS}
							initialData={{
								name: agent.name,
								description: agent.description,
								model: agent.model,
								is_default: agent.is_default,
							}}
							schema={basicInfoSchema}
							onSave={(values) => handleSave('basic_info', values)}
							ViewComponent={({ name, description }) => <AgentDescription description={description} />}
						/>

						{/* Model Configuration - Editable */}
						<EditableSection
							title='Model Configuration'
							fields={MODEL_CONFIG_FIELDS}
							initialData={agent.model_config}
							schema={modelConfigSchema}
							onSave={(values) => handleSave('model_config', values)}
							ViewComponent={(props) => <AgentModelConfig modelConfig={props} />}
						/>

						{/* Prompt Configuration - Editable with Dynamic Keys */}
						<EditableSection
							title='Prompt Configuration'
							fields={[PROMPT_CONFIG_FIELD]}
							initialData={agent.prompt_config}
							schema={promptConfigSchema}
							onSave={(values) => handleSave('prompt_config', values)}
							ViewComponent={(props) => <AgentPromptConfig promptConfig={props} />}
						/>

						{/* Metadata - Read Only */}
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
