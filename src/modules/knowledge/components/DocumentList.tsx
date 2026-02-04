'use client';

import React from 'react';
import { Document } from '../types';
import { DocumentCard } from './DocumentListItem';
import { DocumentListLoading } from './DocumentListLoading';
import { DocumentListEmpty } from './DocumentListEmpty';

interface DocumentListProps {
	documents: Document[];
	isLoading: boolean;
	selectedIds?: string[];
	onToggleSelect?: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
	documents,
	isLoading,
	selectedIds = [],
	onToggleSelect,
}) => {
	if (isLoading) {
		return <DocumentListLoading />;
	}

	if (documents.length === 0) {
		return <DocumentListEmpty />;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{documents.map((document) => (
				<DocumentCard
					key={document.id}
					document={document}
					isSelected={selectedIds.includes(document.id)}
					onToggleSelect={onToggleSelect}
				/>
			))}
		</div>
	);
};
