import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import Card, { CardBody, CardFooter, CardFooterChild } from '@/components/ui/Card';
import Avatar from '@/components/Avatar';
import { UserBrainThumb } from '@/assets/images';
import { StaticImageData } from 'next/image';
import ReactMarkdown from 'react-markdown';
import DocumentReference from './DocumentReference';
import ProgressIndicator from './ProgressIndicator';
import { DocumentReference as DocRefType, ProgressInfo } from '../types';

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
	isAnswer?: boolean;
	userImage?: string | StaticImageData;
	userName?: string;
	documents?: DocRefType[];
	isStreaming?: boolean;
	progress?: ProgressInfo | null;
}

const ChatMessage: FC<ChatMessageProps> = (props) => {
	const { 
		children, 
		className, 
		isAnswer = false, 
		userImage, 
		userName = 'AI', 
		documents,
		isStreaming = false,
		progress,
		...rest 
	} = props;

	const content = typeof children === 'string' ? children : '';
	const hasContent = content.length > 0;
	
	return (
		<div
			className={classNames(
				'col-span-10 lg:col-span-8',
				{ 'col-start-3 lg:col-start-5': !isAnswer },
				className,
			)}
			{...rest}>
			<Card>
				<CardBody className='pb-12'>
					{/* Contenido del mensaje */}
					{hasContent && (
						<div className='prose prose-sm dark:prose-invert max-w-none mb-4'>
							{typeof children === 'string' ? (
								<ReactMarkdown>{children}</ReactMarkdown>
							) : (
								children
							)}
						</div>
					)}

					{/* Skeleton loader cuando está generando pero sin contenido */}
					{isStreaming && !hasContent && (
						<div className='space-y-2 mb-4 animate-pulse'>
							<div className='h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full'></div>
							<div className='h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-11/12'></div>
							<div className='h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5'></div>
						</div>
					)}

					{/* Indicador de progreso compacto dentro del mensaje */}
					{isStreaming && progress && (
						<div className='mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700'>
							<ProgressIndicator progress={progress} compact />
						</div>
					)}

					{/* Referencias de documentos con más espacio superior */}
					{isAnswer && documents && documents.length > 0 && !isStreaming && (
						<div className='mt-6'>
							<DocumentReference documents={documents} />
						</div>
					)}
				</CardBody>
				<CardFooter className='relative !p-0'>
					<CardFooterChild />
					<CardFooterChild>
						<Avatar
							src={isAnswer ? UserBrainThumb : userImage}
							className={classNames('absolute -top-6', {
								'start-6': isAnswer,
								'end-6': !isAnswer,
							})}
							name={userName}
							rounded='rounded-xl'
						/>
					</CardFooterChild>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ChatMessage;
