'use client';

import React from 'react';

interface AgentDescriptionProps {
	description: string;
}

export const AgentDescription: React.FC<AgentDescriptionProps> = ({ description }) => {
	return (
		<div>
			<h3 className='text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3'>Description</h3>
			<p className='text-zinc-600 dark:text-zinc-400 leading-relaxed'>{description}</p>
		</div>
	);
};
