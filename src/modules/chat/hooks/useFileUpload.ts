import { useState, useCallback } from 'react';

interface UseFileUploadReturn {
	selectedFiles: File[];
	addFiles: (files: File[]) => void;
	removeFile: (index: number) => void;
	clearFiles: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const addFiles = useCallback((files: File[]) => {
		setSelectedFiles((prev) => [...prev, ...files]);
	}, []);

	const removeFile = useCallback((index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const clearFiles = useCallback(() => {
		setSelectedFiles([]);
	}, []);

	return {
		selectedFiles,
		addFiles,
		removeFile,
		clearFiles,
	};
};
