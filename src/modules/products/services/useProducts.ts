import api from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { ProductsResponse, ProductsQueryParams } from '../types/productTypes';

export const useProducts = (params?: ProductsQueryParams) => {
	return useQuery<ProductsResponse>({
		queryKey: ['products', params],
		queryFn: () => api.get('/products', { params }),
	});
};
