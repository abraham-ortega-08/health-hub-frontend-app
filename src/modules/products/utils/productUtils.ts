export const formatProductPrice = (price: string): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(parseFloat(price));
};
