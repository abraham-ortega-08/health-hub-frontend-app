/**
 * Format date string to locale date with time
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
export const getDocumentTypeBadgeColor = (type: 'FIXED' | 'DYNAMIC') => {
	return type === 'FIXED' ? ('blue' as const) : ('emerald' as const);
};

/**
 * Get document type label
 */
export const getDocumentTypeLabel = (type: 'FIXED' | 'DYNAMIC'): string => {
	return type === 'FIXED' ? 'Fixed' : 'Dynamic';
};

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
	// Handle invalid or undefined values
	if (bytes === null || bytes === undefined || isNaN(bytes) || bytes < 0) {
		return 'Unknown';
	}
	
	if (bytes === 0) return '0 Bytes';
	
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	
	// Ensure i is within bounds
	const sizeIndex = Math.min(i, sizes.length - 1);
	
	return Math.round((bytes / Math.pow(k, sizeIndex)) * 100) / 100 + ' ' + sizes[sizeIndex];
};
