/**
 * Extrae el mensaje de error de una respuesta de API
 * @param error - El objeto de error capturado
 * @param defaultMessage - Mensaje por defecto si no se puede extraer uno de la API
 * @returns El mensaje de error formateado
 */
export const extractApiErrorMessage = (
	error: any,
	defaultMessage: string = 'An error occurred. Please try again.'
): string => {
	// Si no hay error, retornar mensaje por defecto
	if (!error) return defaultMessage;

	// Intentar extraer el mensaje de la respuesta de la API
	if (error?.response?.data) {
		const apiError = error.response.data;

		// Caso 1: error.response.data.error es un string
		if (typeof apiError.error === 'string') {
			return apiError.error;
		}

		// Caso 2: error.response.data.message existe
		if (apiError.message) {
			return apiError.message;
		}

		// Caso 3: error.response.data.error es un objeto con message
		if (typeof apiError.error === 'object' && apiError.error?.message) {
			return apiError.error.message;
		}
	}

	// Si el error tiene un mensaje directo
	if (error?.message) {
		return error.message;
	}

	// Retornar mensaje por defecto
	return defaultMessage;
};
