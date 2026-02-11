'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Agent } from '../../../types';

interface AgentPromptConfigProps {
	promptConfig: Agent['prompt_config'];
}

const PROMPT_LABELS: Record<string, string> = {
	system_prompt: 'System Prompt',
	no_context_prompt: 'No Context Prompt',
};

export const AgentPromptConfig: React.FC<AgentPromptConfigProps> = ({ promptConfig }) => {
	const promptKeys = ['system_prompt', 'no_context_prompt'];

	return (
		<div className='space-y-6'>
			{promptKeys.map((key) => {
				const value = promptConfig[key as keyof typeof promptConfig];
				if (!value) return null;

				return (
					<div key={key} className='space-y-2'>
						<h3 className='text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide'>
							{PROMPT_LABELS[key] || key.replace(/_/g, ' ')}
						</h3>
						<div className='max-h-[500px] overflow-y-auto p-5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
							<div className='prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700 prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 prose-table:border-zinc-200 dark:prose-table:border-zinc-800 prose-th:border-zinc-200 dark:prose-th:border-zinc-800 prose-td:border-zinc-200 dark:prose-td:border-zinc-800'>
								<ReactMarkdown 
									remarkPlugins={[remarkGfm]}
									rehypePlugins={[rehypeRaw]}
								>
									{value as string}
								</ReactMarkdown>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
