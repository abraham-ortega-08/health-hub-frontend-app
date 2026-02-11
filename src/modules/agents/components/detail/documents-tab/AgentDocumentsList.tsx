'use client';

import React, { useState } from 'react';
import { DocumentList, Document } from '@/components/documents';
import { useAgentDocuments } from '../../../services';
import { Pagination } from '@/modules/knowledge/components/Pagination';

interface AgentDocumentsListProps {
	agentId: string;
}

export const AgentDocumentsList: React.FC<AgentDocumentsListProps> = ({ agentId }) => {
	const [page, setPage] = useState(1);
	const limit = 9; // 9 documents per page for 3x3 grid
	
	const { data, isLoading } = useAgentDocuments(agentId, {
		page,
		limit,
		includeContent: false,
	});

	// Convert AgentDocuments to shared Document format
	const documents: Document[] = data
		? data.items.map((doc) => ({
				id: doc.id,
				name: doc.name,
				type: doc.type,
				user_id: doc.user_id || '',
				session_id: doc.session_id || '',
				created_at: doc.created_at,
				file_size: doc.file_size,
				mime_type: doc.mime_type,
				chunk_count: doc.chunk_count,
		  }))
		: [];

	// Calculate pagination values
	const totalPages = data ? Math.ceil(data.total / limit) : 0;
	const hasNext = data ? data.hasNext : false;
	const hasPrevious = data ? data.hasPrevious : false;

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		}
	};

	return (
		<div className='space-y-6'>
			{/* Stats */}
			{data && !isLoading && (
				<div className='flex items-center justify-between'>
					<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
						<span className='text-sm text-zinc-600 dark:text-zinc-400'>Total Documents:</span>
						<span className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>{data.total}</span>
					</div>
					<div className='text-sm text-zinc-600 dark:text-zinc-400'>
						Page {page} of {totalPages}
					</div>
				</div>
			)}

			{/* Documents List using shared components */}
			<DocumentList documents={documents} isLoading={isLoading} />

			{/* Pagination */}
			{data && totalPages > 1 && (
				<div className='flex justify-center pt-4'>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						hasNext={hasNext}
						hasPrevious={hasPrevious}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
};
