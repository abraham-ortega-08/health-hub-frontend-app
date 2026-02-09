'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { Agent } from '../../../types';

interface AgentMetadataProps {
	createdBy: Agent['created_by'];
	createdAt: Agent['created_at'];
	updatedAt: Agent['updated_at'];
}

export const AgentMetadata: React.FC<AgentMetadataProps> = ({
	createdBy,
	createdAt,
	updatedAt,
}) => {
	return (
		<div className='bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800'>
			<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4'>Metadata</h2>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='flex items-start gap-3'>
					<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
						<Icon icon='heroicons:user' className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
					</div>
					<div className='flex flex-col'>
						<span className='text-xs text-zinc-500 dark:text-zinc-500'>Created by</span>
						<span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
							{createdBy}
						</span>
					</div>
				</div>
				<div className='flex items-start gap-3'>
					<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
						<Icon icon='heroicons:calendar' className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
					</div>
					<div className='flex flex-col'>
						<span className='text-xs text-zinc-500 dark:text-zinc-500'>Created at</span>
						<span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
							{new Date(createdAt).toLocaleDateString()}
						</span>
					</div>
				</div>
				<div className='flex items-start gap-3'>
					<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
						<Icon icon='heroicons:clock' className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
					</div>
					<div className='flex flex-col'>
						<span className='text-xs text-zinc-500 dark:text-zinc-500'>Updated at</span>
						<span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
							{new Date(updatedAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
