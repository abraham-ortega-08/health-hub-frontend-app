'use client';

import React from 'react';
import { Icon } from '@iconify/react';

export const AgentListEmpty: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center py-16 px-4'>
			<div className='bg-zinc-100 dark:bg-zinc-800 rounded-full p-6 mb-6'>
				<Icon icon='heroicons:cpu-chip' className='w-16 h-16 text-zinc-400 dark:text-zinc-600' />
			</div>
			<h3 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2'>
				No agents found
			</h3>
			<p className='text-zinc-600 dark:text-zinc-400 text-center max-w-md'>
				There are no AI agents available at the moment.
			</p>
		</div>
	);
};
