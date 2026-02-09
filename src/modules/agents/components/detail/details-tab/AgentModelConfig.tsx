'use client';

import React from 'react';
import { Agent } from '../../../types';

interface AgentModelConfigProps {
	modelConfig: Agent['model_config'];
}

export const AgentModelConfig: React.FC<AgentModelConfigProps> = ({ modelConfig }) => {
	return (
		<div className='bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800'>
			<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4'>
				Model Configuration
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{Object.entries(modelConfig).map(([key, value]) => (
					<div
						key={key}
						className='flex flex-col gap-1 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50'>
						<span className='text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-wide'>
							{key.replace(/_/g, ' ')}
						</span>
						<span className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'>
							{value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
