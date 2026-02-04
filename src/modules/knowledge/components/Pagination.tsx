'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { calculatePageRange } from '../utils/documentUtils';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	hasNext,
	hasPrevious,
	onPageChange,
}) => {
	const pageRange = calculatePageRange(currentPage, totalPages);

	return (
		<div className='flex items-center justify-center gap-2'>
			<Button
				icon='HeroChevronLeft'
				variant='outline'
				size='sm'
				isDisable={!hasPrevious}
				onClick={() => onPageChange(currentPage - 1)}
			/>

			{pageRange.map((page) => (
				<Button
					key={page}
					variant={page === currentPage ? 'solid' : 'outline'}
					size='sm'
					onClick={() => onPageChange(page)}>
					{page}
				</Button>
			))}

			<Button
				icon='HeroChevronRight'
				variant='outline'
				size='sm'
				isDisable={!hasNext}
				onClick={() => onPageChange(currentPage + 1)}
			/>
		</div>
	);
};
