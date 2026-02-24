'use client';

import React from 'react';
import Table, { TBody, Tr, Td } from '@/components/ui/Table';
import TableHeader from '@/components/ui/TableHeader';

const PRODUCT_COLUMNS = ['Name', 'Category', 'Price', 'Status', 'Description', 'Link'];

export const ProductTableLoading: React.FC = () => {
	return (
		<div className='overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800'>
			<Table>
				<TableHeader columns={PRODUCT_COLUMNS} />
				<TBody>
					{[...Array(10)].map((_, index) => (
						<Tr key={index} className='animate-pulse'>
							<Td>
								<div className='h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-32'></div>
							</Td>
							<Td>
								<div className='h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24'></div>
							</Td>
							<Td>
								<div className='h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16'></div>
							</Td>
							<Td>
								<div className='h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full w-16'></div>
							</Td>
							<Td>
								<div className='space-y-1.5'>
									<div className='h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full'></div>
									<div className='h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5'></div>
								</div>
							</Td>
						</Tr>
					))}
				</TBody>
			</Table>
		</div>
	);
};
