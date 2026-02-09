'use client';

import React from 'react';

interface AgentDescriptionProps {
	description: string;
}

export const AgentDescription: React.FC<AgentDescriptionProps> = ({ description }) => {
	return (
		<div className='bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800'>
			<h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3'>
				Description
			</h2>
			<p className='text-zinc-600 dark:text-zinc-400'>{description}</p>
		</div>
	);
};
