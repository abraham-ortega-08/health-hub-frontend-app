'use client';

import React from 'react';
import { DocumentCard, Document } from './DocumentCard';
import { DocumentListLoading } from './DocumentListLoading';
import { DocumentListEmpty } from './DocumentListEmpty';
import {
	formatDocumentDate,
	getDocumentTypeBadgeColor,
	getDocumentTypeLabel,
} from './documentUtils';

interface DocumentListProps {
	documents: Document[];
	isLoading: boolean;
	selectedIds?: string[];
	onToggleSelect?: (id: string) => void;
	onDelete?: (id: string) => Promise<void>;
	isDeletingId?: string;
	formatDate?: (date: string) => string;
	getTypeBadgeColor?: (type: 'FIXED' | 'DYNAMIC') => 'blue' | 'emerald';
	getTypeLabel?: (type: 'FIXED' | 'DYNAMIC') => string;
}

export const DocumentList: React.FC<DocumentListProps> = ({
	documents,
	isLoading,
	selectedIds = [],
	onToggleSelect,
	onDelete,
	isDeletingId,
	formatDate = formatDocumentDate,
	getTypeBadgeColor = getDocumentTypeBadgeColor,
	getTypeLabel = getDocumentTypeLabel,
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
					onDelete={onDelete}
					isDeleting={isDeletingId === document.id}
					formatDate={formatDate}
					getTypeBadgeColor={getTypeBadgeColor}
					getTypeLabel={getTypeLabel}
				/>
			))}
		</div>
	);
};
