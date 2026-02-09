'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Badge from '@/components/ui/Badge';
import {
	formatDocumentDate,
	getDocumentTypeBadgeColor,
	getDocumentTypeLabel,
	formatFileSize,
} from './documentUtils';

export interface Document {
	id: string;
	name: string;
	type: 'FIXED' | 'DYNAMIC';
	user_id: string;
	session_id: string;
	created_at: string;
	file_size?: number;
	mime_type?: string;
	chunk_count?: number;
}

interface DocumentCardProps {
	document: Document;
	isSelected?: boolean;
	onToggleSelect?: (id: string) => void;
	onDelete?: (id: string) => Promise<void>;
	isDeleting?: boolean;
	formatDate?: (date: string) => string;
	getTypeBadgeColor?: (type: 'FIXED' | 'DYNAMIC') => 'blue' | 'emerald';
	getTypeLabel?: (type: 'FIXED' | 'DYNAMIC') => string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
	document,
	isSelected = false,
	onToggleSelect,
	onDelete,
	isDeleting = false,
	formatDate = formatDocumentDate,
	getTypeBadgeColor = getDocumentTypeBadgeColor,
	getTypeLabel = getDocumentTypeLabel,
}) => {
	const handleDelete = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onDelete) {
			await onDelete(document.id);
		}
	};

	const handleCheckboxClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onToggleSelect?.(document.id);
	};

	return (
		<div className='group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
			{/* Decorative gradient background */}
			<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>

			{/* Content */}
			<div className='flex flex-col gap-4'>
				{/* Header with checkbox, name and badge */}
				<div className='flex items-start justify-between gap-3'>
					{/* Left side - Checkbox and Name */}
					<div className='flex items-start gap-3 flex-1 min-w-0'>
						{/* Checkbox */}
						{onToggleSelect && (
							<button
								onClick={handleCheckboxClick}
								className={`flex-shrink-0 mt-1 flex items-center justify-center w-5 h-5 rounded border-2 transition-all ${
									isSelected
										? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
										: 'border-zinc-300 dark:border-zinc-600 hover:border-blue-500 dark:hover:border-blue-400 opacity-0 group-hover:opacity-100'
								}`}>
								{isSelected && <Icon icon='mdi:check' className='w-4 h-4 text-white' />}
							</button>
						)}
						{/* Document Name with Tooltip */}
						<div className='relative flex-1 min-w-0' title={document.name}>
							<h3 className='font-semibold text-lg text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
								{document.name}
							</h3>
						</div>
					</div>

					{/* Right side - Badge and Delete */}
					<div className='flex items-center gap-2 shrink-0'>
						<Badge color={getTypeBadgeColor(document.type)} variant='solid'>
							{getTypeLabel(document.type)}
						</Badge>
						{/* Delete button */}
						{onDelete && (
							<button
								onClick={handleDelete}
								disabled={isDeleting}
								className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed'
								title='Delete document'>
								{isDeleting ? (
									<Icon icon='mdi:loading' className='w-5 h-5 animate-spin' />
								) : (
									<Icon icon='mdi:delete-outline' className='w-5 h-5' />
								)}
							</button>
						)}
					</div>
				</div>

				{/* Divider */}
				<div className='h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent'></div>

				{/* Info section */}
				<div className='grid grid-cols-2 gap-3 text-sm'>
					{/* Created Date */}
					<div className='flex items-center gap-2'>
						<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
							<Icon icon='heroicons:calendar' className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
						</div>
						<div className='flex flex-col min-w-0'>
							<span className='text-xs text-zinc-500 dark:text-zinc-500'>Created</span>
							<span className='text-zinc-700 dark:text-zinc-300 truncate text-xs'>
								{formatDate(document.created_at)}
							</span>
						</div>
					</div>

					{/* File Size */}
					{document.file_size !== undefined && (
						<div className='flex items-center gap-2'>
							<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
								<Icon icon='heroicons:circle-stack' className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
							</div>
							<div className='flex flex-col min-w-0'>
								<span className='text-xs text-zinc-500 dark:text-zinc-500'>Size</span>
								<span className='text-zinc-700 dark:text-zinc-300 truncate font-medium text-xs'>
									{formatFileSize(document.file_size)}
								</span>
							</div>
						</div>
					)}

					{/* Chunk Count */}
					{document.chunk_count !== undefined && (
						<div className='flex items-center gap-2'>
							<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
								<Icon icon='heroicons:document-duplicate' className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
							</div>
							<div className='flex flex-col min-w-0'>
								<span className='text-xs text-zinc-500 dark:text-zinc-500'>Chunks</span>
								<span className='text-zinc-700 dark:text-zinc-300 truncate font-medium text-xs'>
									{document.chunk_count}
								</span>
							</div>
						</div>
					)}

					{/* MIME Type / Format */}
					{document.mime_type && (
						<div className='flex items-center gap-2'>
							<div className='flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0'>
								<Icon icon='heroicons:document-text' className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
							</div>
							<div className='flex flex-col min-w-0'>
								<span className='text-xs text-zinc-500 dark:text-zinc-500'>Format</span>
								<span className='text-zinc-700 dark:text-zinc-300 truncate font-medium text-xs uppercase'>
									{document.mime_type.split('/')[1] || document.mime_type}
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
