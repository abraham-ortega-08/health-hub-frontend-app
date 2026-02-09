'use client';

import React from 'react';
import {
	DocumentList as SharedDocumentList,
	Document as SharedDocument,
	formatDocumentDate,
	getDocumentTypeBadgeColor,
	getDocumentTypeLabel,
} from '@/components/documents';
import { Document } from '../types';
import { useDelete } from '../hooks';

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
	const { isDeleting, deletingId, deleteDocument } = useDelete();

	const handleDelete = async (id: string) => {
		await deleteDocument(id);
	};

	// Convert Document to SharedDocument
	const sharedDocuments: SharedDocument[] = documents;

	return (
		<SharedDocumentList
			documents={sharedDocuments}
			isLoading={isLoading}
			selectedIds={selectedIds}
			onToggleSelect={onToggleSelect}
			onDelete={handleDelete}
			isDeletingId={deletingId}
			formatDate={formatDocumentDate}
			getTypeBadgeColor={getDocumentTypeBadgeColor}
			getTypeLabel={getDocumentTypeLabel}
		/>
	);
};
