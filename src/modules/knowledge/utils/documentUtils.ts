import { Document } from '../types';

/**
 * Format date string to locale date
 */
export const formatDocumentDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

/**
 * Get badge color by document type
 */
export const getDocumentTypeBadgeColor = (type: Document['type']) => {
	return type === 'FIXED' ? 'blue' : 'emerald';
};

/**
 * Get document type label
 */
export const getDocumentTypeLabel = (type: Document['type']): string => {
	return type === 'FIXED' ? 'Fixed' : 'Dynamic';
};

/**
 * Calculate page range for pagination
 */
export const calculatePageRange = (
	currentPage: number,
	totalPages: number,
	maxVisible: number = 5,
): number[] => {
	if (totalPages <= maxVisible) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const halfVisible = Math.floor(maxVisible / 2);
	let startPage = Math.max(1, currentPage - halfVisible);
	let endPage = Math.min(totalPages, startPage + maxVisible - 1);

	if (endPage - startPage < maxVisible - 1) {
		startPage = Math.max(1, endPage - maxVisible + 1);
	}

	return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
