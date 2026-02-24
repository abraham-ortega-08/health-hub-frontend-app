'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import { ProductTable, Pagination, useProductList } from '@/modules/products';

const ProductsClient = () => {
	const { products, pagination, isLoading, search, actions } = useProductList();

	return (
		<PageWrapper>
			<Container>
				<div className='space-y-6 px-4 md:px-6 lg:px-8'>
					{/* Header Section */}
					<div className='space-y-4'>
						<div className='flex items-center justify-between gap-4'>
							{/* Left side - Title and Description */}
							<div className='space-y-2 flex-1'>
								<div className='flex items-center gap-3'>
									<div className='flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg'>
										<Icon icon='heroicons:shopping-bag' className='w-6 h-6 text-white' />
									</div>
									<div>
										<h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent'>
											Products
										</h1>
									</div>
								</div>
								<p className='text-sm text-zinc-600 dark:text-zinc-400 pl-14'>
									Browse and explore all available products in the catalog
								</p>
							</div>

							{/* Search input */}
							<div className='relative w-full max-w-sm self-center'>
								<Icon
									icon='heroicons:magnifying-glass'
									className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none'
								/>
								<input
									type='text'
									value={search}
									onChange={(e) => actions.handleSearch(e.target.value)}
									placeholder='Search products...'
									className='w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all'
								/>
								{search && (
									<button
										onClick={() => actions.handleSearch('')}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors'>
										<Icon icon='heroicons:x-mark' className='w-4 h-4' />
									</button>
								)}
							</div>
						</div>

						{/* Divider */}
						<div className='h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent'></div>
					</div>

					{/* Stats Bar */}
					{!isLoading && (
						<div className='flex items-center gap-4 pb-2'>
							<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
								<span className='text-sm text-zinc-600 dark:text-zinc-400'>Total Products:</span>
								<span className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
									{pagination.total}
								</span>
							</div>
							<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
								<span className='text-sm text-zinc-600 dark:text-zinc-400'>
									Page {pagination.currentPage} of {pagination.totalPages}
								</span>
							</div>
						</div>
					)}

					{/* Products Table */}
					<ProductTable products={products} isLoading={isLoading} />

					{/* Pagination */}
					{!isLoading && products.length > 0 && (
						<div className='flex justify-center pt-4'>
							<Pagination
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
								hasNext={pagination.hasNext}
								hasPrevious={pagination.hasPrevious}
								onPageChange={actions.goToPage}
							/>
						</div>
					)}
				</div>
			</Container>
		</PageWrapper>
	);
};

export default ProductsClient;
