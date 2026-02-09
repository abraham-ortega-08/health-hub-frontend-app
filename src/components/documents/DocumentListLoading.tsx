'use client';

import React from 'react';

export const DocumentListLoading: React.FC = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{[...Array(6)].map((_, index) => (
				<div
					key={index}
					className='bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 animate-pulse'>
					<div className='flex flex-col gap-4'>
						<div className='flex items-start justify-between gap-2'>
							<div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-3/4'></div>
							<div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-16'></div>
						</div>
						<div className='space-y-3'>
							<div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full'></div>
							<div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3'></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
