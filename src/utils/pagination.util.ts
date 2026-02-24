/**
 * Calculates the visible page range for a pagination component.
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
