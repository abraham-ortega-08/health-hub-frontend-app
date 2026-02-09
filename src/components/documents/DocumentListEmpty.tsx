'use client';

import React from 'react';

export const DocumentListEmpty: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center py-16 px-4'>
			<div className='relative mb-6'>
				<div className='w-24 h-24 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl rotate-6 absolute -z-10'></div>
				<div className='w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800'>
					<svg
						className='w-12 h-12 text-zinc-400 dark:text-zinc-600'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={1.5}
							d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
						/>
					</svg>
				</div>
			</div>
			<h3 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2'>
				No documents found
			</h3>
			<p className='text-zinc-600 dark:text-zinc-400 text-center max-w-md'>
				Your knowledge base is empty. Start by uploading documents to build your agent's knowledge.
			</p>
		</div>
	);
};
