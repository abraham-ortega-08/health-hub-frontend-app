export interface Product {
	id: string;
	name: string;
	description: string;
	benefits: string | null;
	ingredients: string | null;
	price: string;
	category: string;
	product_url: string;
	image_url: string | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface ProductsResponse {
	items: Product[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface ProductsQueryParams {
	page?: number;
	limit?: number;
	all?: boolean;
	search?: string;
}
