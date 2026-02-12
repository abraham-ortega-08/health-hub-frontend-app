import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon } from '@iconify/react';

interface DocumentReferenceProps {
	documents: Array<{
		name: string;
		fragment: string;
		similarity: string;
	}>;
}

const DocumentReference: FC<DocumentReferenceProps> = ({ documents }) => {
	if (!documents || documents.length === 0) return null;

	return (
		<div className='mt-6 space-y-2'>
			<div className='flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300'>
				<Icon icon='heroicons:document-text' className='text-lg' />
				<span>Referenced Documents ({documents.length})</span>
			</div>
			<div className='space-y-2'>
				{documents.map((doc, index) => (
					<details
						key={index}
						className={classNames(
							'group rounded-lg border border-zinc-200 dark:border-zinc-700',
							'bg-zinc-50 dark:bg-zinc-800/50',
							'transition-all duration-200',
							'hover:border-blue-300 dark:hover:border-blue-700'
						)}>
						<summary className={classNames(
							'flex cursor-pointer items-center justify-between px-4 py-3',
							'text-sm font-medium text-zinc-800 dark:text-zinc-200',
							'hover:text-blue-600 dark:hover:text-blue-400',
							'transition-colors'
						)}>
							<div className='flex items-center gap-2 flex-1 min-w-0'>
								<Icon 
									icon='heroicons:document' 
									className='text-blue-500 dark:text-blue-400 flex-shrink-0' 
								/>
								<span className='truncate'>{doc.name}</span>
							</div>
							<div className='flex items-center gap-2 flex-shrink-0'>
								<span className={classNames(
									'rounded-full px-2 py-0.5 text-xs font-semibold',
									'bg-blue-100 dark:bg-blue-900/30',
									'text-blue-700 dark:text-blue-300'
								)}>
									{(parseFloat(doc.similarity) * 100).toFixed(1)}% match
								</span>
								<Icon 
									icon='heroicons:chevron-down' 
									className='text-zinc-500 transition-transform group-open:rotate-180' 
								/>
							</div>
						</summary>
						<div className='border-t border-zinc-200 dark:border-zinc-700 px-4 py-3'>
							<p className='text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap'>
								{doc.fragment}
							</p>
						</div>
					</details>
				))}
			</div>
		</div>
	);
};

export default DocumentReference;
