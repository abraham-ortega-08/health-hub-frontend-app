import React, { FC, useState, useRef, KeyboardEvent } from 'react';
import FieldWrap from '@/components/form/FieldWrap';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import FilePreview from './FilePreview';

interface ChatInputProps {
	onSend: (message: string) => void;
	files: File[];
	onAddFiles: (files: File[]) => void;
	onRemoveFile: (index: number) => void;
	onClearFiles: () => void;
	disabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({
	onSend,
	files,
	onAddFiles,
	onRemoveFile,
	onClearFiles,
	disabled = false,
}) => {
	const [message, setMessage] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSend = () => {
		if (!message.trim() || disabled) return;
		onSend(message);
		setMessage('');
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			onAddFiles(filesArray);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div>
			<FilePreview files={files} onRemove={onRemoveFile} onClearAll={onClearFiles} />
			
			<FieldWrap
				firstSuffix={
					<Button
						icon='heroicons:plus'
						variant={message.trim() ? 'default' : 'solid'}
						rounded='rounded'
						className='me-2'
						aria-label='Upload file'
						onClick={handleUploadClick}
						isDisable={disabled}
					/>
				}
				lastSuffix={
					message.trim() && (
						<Button
							className='ms-2'
							variant='solid'
							rounded='rounded'
							icon='heroicons:paper-airplane'
							onClick={handleSend}
							isDisable={disabled}>
							Send
						</Button>
					)
				}>
				<Input
					name='message'
					dimension='xl'
					placeholder='Ask something'
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					value={message}
					disabled={disabled}
				/>
			</FieldWrap>

			<input
				ref={fileInputRef}
				type='file'
				multiple
				className='hidden'
				onChange={handleFileSelect}
				accept='.pdf,.doc,.docx,.txt'
			/>
		</div>
	);
};

export default ChatInput;
