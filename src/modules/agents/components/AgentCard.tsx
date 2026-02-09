'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Badge from '@/components/ui/Badge';
import { Agent } from '../types';
import { useRouter } from 'next/navigation';

interface AgentCardProps {
	agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/agents/${agent.id}`);
	};

	return (
		<div
			onClick={handleClick}
			className='group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'>
			{/* Decorative gradient */}
			<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

			<div className='flex flex-col gap-4'>
				{/* Header */}
				<div className='flex items-start justify-between gap-3'>
					<div className='flex items-start gap-3 flex-1 min-w-0'>
						<div className='flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shrink-0'>
							<Icon icon='heroicons:cpu-chip' className='w-6 h-6 text-white' />
						</div>
						<div className='flex-1 min-w-0'>
							<h3 className='font-semibold text-lg text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
								{agent.name}
							</h3>
							<p className='text-sm text-zinc-500 dark:text-zinc-400 mt-0.5'>
								{agent.model}
							</p>
						</div>
					</div>
					<div className='flex gap-2 shrink-0'>
						{agent.is_default && (
							<Badge color='amber' variant='solid'>
								Default
							</Badge>
						)}
						<Badge color={agent.is_active ? 'emerald' : 'zinc'} variant='solid'>
							{agent.is_active ? 'Active' : 'Inactive'}
						</Badge>
					</div>
				</div>

				{/* Divider */}
				<div className='h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent'></div>

				{/* Description */}
				<p className='text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2'>
					{agent.description}
				</p>

				{/* Footer */}
				<div className='flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500'>
					<div className='flex items-center gap-2'>
						<Icon icon='heroicons:document-text' className='w-4 h-4' />
						<span>{agent.document_count} documents</span>
					</div>
					<div className='flex items-center gap-1 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity'>
						<span className='font-medium'>View details</span>
						<Icon icon='heroicons:arrow-right' className='w-4 h-4' />
					</div>
				</div>
			</div>
		</div>
	);
};
