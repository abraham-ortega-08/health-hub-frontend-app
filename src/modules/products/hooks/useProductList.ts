'use client';

import { useState } from 'react';
import { useProducts } from '../services/useProducts';
import { ProductsQueryParams } from '../types/productTypes';
import { useDebounce } from '@/hooks/useDebounce';

const DEFAULT_LIMIT = 10;

export const useProductList = () => {
	const [search, setSearch] = useState('');
	const [params, setParams] = useState<ProductsQueryParams>({
		page: 1,
		limit: DEFAULT_LIMIT,
		all: false,
	});

	const debouncedSearch = useDebounce(search, 400);

	const { data, isLoading, error } = useProducts({
		...params,
		search: debouncedSearch || undefined,
	});

	const goToPage = (page: number) => {
		setParams((prev: ProductsQueryParams) => ({ ...prev, page }));
	};

	const setPageLimit = (limit: number) => {
		setParams((prev: ProductsQueryParams) => ({ ...prev, limit, page: 1 }));
	};

	const handleSearch = (value: string) => {
		setSearch(value);
		setParams((prev: ProductsQueryParams) => ({ ...prev, page: 1 }));
	};

	return {
		products: data?.items || [],
		pagination: {
			currentPage: data?.page || 1,
			totalPages: data?.totalPages || 1,
			total: data?.total || 0,
			limit: data?.limit || DEFAULT_LIMIT,
			hasNext: data?.hasNext || false,
			hasPrevious: data?.hasPrevious || false,
		},
		search,
		isLoading,
		error,
		actions: {
			goToPage,
			setPageLimit,
			handleSearch,
		},
	};
};
