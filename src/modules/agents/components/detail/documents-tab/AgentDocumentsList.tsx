'use client';

import React, { useState } from 'react';
import { DocumentList, Document } from '@/components/documents';
import { useAgentDocuments } from '../../../services';

interface AgentDocumentsListProps {
	agentId: string;
}

export const AgentDocumentsList: React.FC<AgentDocumentsListProps> = ({ agentId }) => {
	const [page] = useState(1);
	const { data, isLoading } = useAgentDocuments(agentId, {
		page,
		limit: 10,
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

	return (
		<div className='space-y-4'>
			{/* Stats */}
			{data && !isLoading && (
				<div className='flex items-center justify-between'>
					<div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700'>
						<span className='text-sm text-zinc-600 dark:text-zinc-400'>Total Documents:</span>
						<span className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>{data.total}</span>
					</div>
				</div>
			)}

			{/* Documents List using shared components */}
			<DocumentList documents={documents} isLoading={isLoading} />
		</div>
	);
};
