'use client';

import React from 'react';
import { Agent } from '../../../types';

interface AgentPromptConfigProps {
	promptConfig: Agent['prompt_config'];
}

export const AgentPromptConfig: React.FC<AgentPromptConfigProps> = ({ promptConfig }) => {
	return (
		<div className='space-y-4'>
			{Object.entries(promptConfig).map(([key, value]) => {
				if (key === 'ADDITIONAL_SECTIONS' && typeof value === 'object') {
					return (
						<div key={key}>
							<h3 className='text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wide'>
								{key.replace(/_/g, ' ')}
							</h3>
							<div className='space-y-3'>
								{Object.entries(value as Record<string, string>).map(([subKey, subValue]) => (
									<div key={subKey} className='p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50'>
										<h4 className='text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2 uppercase tracking-wide'>
											{subKey.replace(/_/g, ' ')}
										</h4>
										<p className='text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap'>
											{subValue}
										</p>
									</div>
								))}
							</div>
						</div>
					);
				}
				return (
					<div key={key}>
						<h3 className='text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wide'>
							{key.replace(/_/g, ' ')}
						</h3>
						<div className='p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50'>
							<p className='text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap'>
								{value as string}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};
