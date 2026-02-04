import { useState, useCallback } from 'react';
import { useDelete } from './useDelete';

interface UseDocumentSelectionOptions {
	onDeleteSuccess?: () => void;
}

interface UseDocumentSelectionReturn {
	selectedIds: string[];
	isDeleting: boolean;
	handleSelectAll: (totalDocuments: number, allIds: string[]) => void;
	handleToggleSelect: (id: string) => void;
	handleDeleteSelected: () => Promise<void>;
	clearSelection: () => void;
	isAllSelected: (totalDocuments: number) => boolean;
	isSomeSelected: () => boolean;
}

export const useDocumentSelection = (
	options: UseDocumentSelectionOptions = {}
): UseDocumentSelectionReturn => {
	const { onDeleteSuccess } = options;
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const { isDeleting, deleteDocuments } = useDelete({
		onSuccess: () => {
			setSelectedIds([]);
			onDeleteSuccess?.();
		},
	});

	// Manejar selección/deselección de todos
	const handleSelectAll = useCallback((totalDocuments: number, allIds: string[]) => {
		setSelectedIds((prev) => {
			if (prev.length === totalDocuments) {
				return [];
			}
			return allIds;
		});
	}, []);

	// Manejar selección/deselección individual
	const handleToggleSelect = useCallback((id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
		);
	}, []);

	// Manejar eliminación múltiple
	const handleDeleteSelected = useCallback(async () => {
		if (selectedIds.length === 0) return;
		await deleteDocuments(selectedIds);
	}, [selectedIds, deleteDocuments]);

	// Limpiar selección
	const clearSelection = useCallback(() => {
		setSelectedIds([]);
	}, []);

	// Verificar si todos están seleccionados
	const isAllSelected = useCallback(
		(totalDocuments: number) => {
			return totalDocuments > 0 && selectedIds.length === totalDocuments;
		},
		[selectedIds]
	);

	// Verificar si algunos están seleccionados
	const isSomeSelected = useCallback(() => {
		return selectedIds.length > 0;
	}, [selectedIds]);

	return {
		selectedIds,
		isDeleting,
		handleSelectAll,
		handleToggleSelect,
		handleDeleteSelected,
		clearSelection,
		isAllSelected,
		isSomeSelected,
	};
};
