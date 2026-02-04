import React from 'react';
import { Icon } from '@iconify/react';

interface ModalHeaderProps {
	onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose }) => {
	return (
		<div className='flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800'>
			<div className='flex items-center gap-3'>
				<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600'>
					<Icon icon='mdi:cloud-upload' className='w-5 h-5 text-white' />
				</div>
				<div>
					<h2 className='text-xl font-bold text-zinc-900 dark:text-zinc-100'>
						Upload Documents
					</h2>
					<p className='text-sm text-zinc-600 dark:text-zinc-400'>
						Add files to your knowledge base
					</p>
				</div>
			</div>
			<button
				onClick={onClose}
				className='p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
				<Icon icon='mdi:close' className='w-5 h-5 text-zinc-600 dark:text-zinc-400' />
			</button>
		</div>
	);
};
