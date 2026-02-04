'use client';

import { useState } from 'react';
import { useDocuments } from '../services';
import { DocumentsQueryParams } from '../types';

const DEFAULT_LIMIT = 10;

export const useDocumentList = () => {
	const [params, setParams] = useState<DocumentsQueryParams>({
		page: 1,
		limit: DEFAULT_LIMIT,
		excludeFields: 'original_content',
	});

	const { data, isLoading, error } = useDocuments(params);

	const goToPage = (page: number) => {
		setParams((prev) => ({ ...prev, page }));
	};

	const setPageLimit = (limit: number) => {
		setParams((prev) => ({ ...prev, limit, page: 1 }));
	};

	const filterByType = (type?: 'FIXED' | 'DYNAMIC') => {
		setParams((prev) => ({ ...prev, type, page: 1 }));
	};

	return {
		documents: data?.items || [],
		pagination: {
			currentPage: data?.page || 1,
			totalPages: data?.totalPages || 1,
			total: data?.total || 0,
			limit: data?.limit || DEFAULT_LIMIT,
			hasNext: data?.hasNext || false,
			hasPrevious: data?.hasPrevious || false,
		},
		isLoading,
		error,
		actions: {
			goToPage,
			setPageLimit,
			filterByType,
		},
	};
};
