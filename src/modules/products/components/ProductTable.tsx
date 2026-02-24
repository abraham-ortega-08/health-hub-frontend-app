'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Table, { TBody, Tr, Td } from '@/components/ui/Table';
import TableHeader from '@/components/ui/TableHeader';
import Badge from '@/components/ui/Badge';
import { Product } from '../types';
import { ProductTableLoading } from './ProductTableLoading';
import { ProductTableEmpty } from './ProductTableEmpty';
import { formatProductPrice } from '../utils/productUtils';

const PRODUCT_COLUMNS = ['Name', 'Category', 'Price', 'Status', 'Description', 'Link'];

interface ProductTableProps {
	products: Product[];
	isLoading: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, isLoading }) => {
	if (isLoading) {
		return <ProductTableLoading />;
	}

	if (products.length === 0) {
		return <ProductTableEmpty />;
	}

	return (
		<div className='overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800'>
			<Table>
				<TableHeader columns={PRODUCT_COLUMNS} />
				<TBody>
					{products.map((product) => (
						<Tr key={product.id}>
							<Td>
								<div className='flex items-center gap-3'>
									{product.image_url ? (
										<img
											src={product.image_url}
											alt={product.name}
											className='w-9 h-9 rounded-lg object-cover shrink-0 border border-zinc-200 dark:border-zinc-700'
										/>
									) : (
										<div className='flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shrink-0'>
											<Icon icon='heroicons:shopping-bag' className='w-5 h-5 text-white' />
										</div>
									)}
									<span className='font-medium text-sm text-zinc-900 dark:text-zinc-100 whitespace-nowrap'>
										{product.name}
									</span>
								</div>
							</Td>
							<Td>
								<span className='text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap'>
									{product.category}
								</span>
							</Td>
							<Td>
								<span className='text-sm font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap'>
									{formatProductPrice(product.price)}
								</span>
							</Td>
							<Td>
								<Badge color={product.is_active ? 'emerald' : 'zinc'} variant='solid'>
									{product.is_active ? 'Active' : 'Inactive'}
								</Badge>
							</Td>
							<Td className='max-w-xs'>
								<p className='text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2'>
									{product.description}
								</p>
							</Td>
							<Td>
								{product.product_url && (
									<a
										href={product.product_url}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap'>
										<Icon icon='heroicons:arrow-top-right-on-square' className='w-4 h-4' />
										View
									</a>
								)}
							</Td>
						</Tr>
					))}
				</TBody>
			</Table>
		</div>
	);
};
