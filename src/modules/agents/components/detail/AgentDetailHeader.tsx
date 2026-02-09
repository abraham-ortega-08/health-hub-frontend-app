'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import Subheader, { SubheaderLeft, SubheaderRight } from '@/components/layouts/Subheader/Subheader';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Agent } from '../../types';

interface AgentDetailHeaderProps {
	agent: Agent;
}

export const AgentDetailHeader: React.FC<AgentDetailHeaderProps> = ({ agent }) => {
	const router = useRouter();

	return (
		<Subheader>
			<SubheaderLeft>
				<Button
					icon='heroicons:arrow-left'
					variant='outline'
					onClick={() => router.back()}
					className='mr-4'>
					Back
				</Button>
				<div>
					<div className='flex items-center gap-3 mb-1'>
						<h1 className='text-2xl font-bold'>{agent.name}</h1>
						<div className='flex gap-2'>
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
					<p className='text-zinc-500 dark:text-zinc-400'>{agent.model}</p>
				</div>
			</SubheaderLeft>
			<SubheaderRight>
				<div className='flex items-center gap-2'>
					<Icon icon='heroicons:document-text' className='w-5 h-5 text-zinc-400' />
					<span className='text-sm text-zinc-600 dark:text-zinc-400'>
						<span className='font-semibold'>{agent.document_count}</span> documents
					</span>
				</div>
			</SubheaderRight>
		</Subheader>
	);
};
