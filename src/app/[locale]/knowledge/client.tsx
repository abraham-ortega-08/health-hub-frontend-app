'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import { DocumentList, UploadModal } from '@/modules/knowledge/components';
import { Pagination } from '@/modules/knowledge/components';
import { useDocumentList, useDocumentSelection } from '@/modules/knowledge/hooks';

const KnowledgeClient = () => {
	const { documents, pagination, isLoading, actions } = useDocumentList();
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	
	const selection = useDocumentSelection();

	const isAllSelected = selection.isAllSelected(documents.length);
	const isSomeSelected = selection.isSomeSelected() && !isAllSelected;

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
									<div className='flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'>
										<Icon icon='mdi:book-open-page-variant' className='w-6 h-6 text-white' />
									</div>
									<div>
										<h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent'>
											Knowledge Base
										</h1>
									</div>
								</div>
								<p className='text-sm text-zinc-600 dark:text-zinc-400 pl-14'>
									Manage and view all documents that power your agent's intelligence
								</p>
							</div>

							{/* Right side - Button */}
							<button
								onClick={() => setIsUploadModalOpen(true)}
								className='px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 whitespace-nowrap self-center'>
								<Icon icon='mdi:plus' className='w-4 h-4' />
								Upload Document
							</button>
						</div>

						{/* Divider */}
						<div className='h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent'></div>
					</div>

					{/* Stats Bar with Checkbox and Delete Action */}
					<div className='flex items-center justify-between gap-4 pb-2'>
						<div className='flex items-center gap-4'>
							{/* Checkbox para seleccionar todos */}
							{documents.length > 0 && (
								<div className='flex items-center gap-2'>
									<button
										onClick={() =>
											selection.handleSelectAll(
												documents.length,
												documents.map((doc) => doc.id)
											)
										}
										className='relative flex items-center justify-center w-5 h-5 rounded border-2 border-zinc-300 dark:border-zinc-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors'>
										{isAllSelected && (
											<Icon
												icon='mdi:check'
												className='w-4 h-4 text-blue-600 dark:text-blue-400'
											/>
										)}
										{isSomeSelected && (
											<Icon
												icon='mdi:minus'
												className='w-4 h-4 text-blue-600 dark:text-blue-400'
											/>
										)}
									</button>
								</div>
							)}

							<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
								<span className='text-sm text-zinc-600 dark:text-zinc-400'>Total Documents:</span>
								<span className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
									{pagination.total}
								</span>
							</div>
						</div>

						{/* Delete Action */}
						{selection.selectedIds.length > 0 && (
							<button
								onClick={selection.handleDeleteSelected}
								disabled={selection.isDeleting}
								className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-200 dark:border-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
								{selection.isDeleting ? (
									<Icon icon='mdi:loading' className='w-4 h-4 animate-spin' />
								) : (
									<Icon icon='mdi:delete-outline' className='w-4 h-4' />
								)}
								<span className='text-sm font-medium'>
									Delete {selection.selectedIds.length}{' '}
									{selection.selectedIds.length === 1 ? 'document' : 'documents'}
								</span>
							</button>
						)}
					</div>

					{/* Documents Grid */}
					<DocumentList
						documents={documents}
						isLoading={isLoading}
						selectedIds={selection.selectedIds}
						onToggleSelect={selection.handleToggleSelect}
					/>

					{/* Pagination */}
					{documents.length > 0 && (
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

			{/* Upload Modal */}
			<UploadModal
				isOpen={isUploadModalOpen}
				onClose={() => setIsUploadModalOpen(false)}
				type='FIXED'
			/>
		</PageWrapper>
	);
};

export default KnowledgeClient;
