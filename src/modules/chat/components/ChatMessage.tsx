import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import Card, { CardBody, CardFooter, CardFooterChild } from '@/components/ui/Card';
import Avatar from '@/components/Avatar';
import { UserBrainThumb } from '@/assets/images';
import { StaticImageData } from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DocumentReference from './DocumentReference';
import ProgressIndicator from './ProgressIndicator';
import { DocumentMetadata, ProgressInfo } from '../types';

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
	isAnswer?: boolean;
	userImage?: string | StaticImageData;
	userName?: string;
	documents?: DocumentMetadata[];
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
				<CardBody className='pb-8'>
					{/* Contenido del mensaje */}
					{hasContent && (
						<div className='prose prose-sm dark:prose-invert max-w-none mb-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-zinc-300 [&_th]:dark:border-zinc-600 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-zinc-100 [&_th]:dark:bg-zinc-800 [&_th]:text-left [&_td]:border [&_td]:border-zinc-300 [&_td]:dark:border-zinc-600 [&_td]:px-3 [&_td]:py-2 [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-blue-300 [&_a]:break-all'>
							{typeof children === 'string' ? (
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									rehypePlugins={[rehypeRaw]}
									components={{
										a: ({ href, children: linkChildren }) => (
											<a
												href={href}
												target='_blank'
												rel='noopener noreferrer'
												className='text-blue-400 underline underline-offset-2 hover:text-blue-300 break-all'>
												{linkChildren}
											</a>
										),
										table: ({ children: tableChildren }) => (
											<div className='overflow-x-auto my-4'>
												<table className='min-w-full border-collapse text-sm'>
													{tableChildren}
												</table>
											</div>
										),
										th: ({ children: thChildren }) => (
											<th className='border border-zinc-300 dark:border-zinc-600 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-left font-semibold'>
												{thChildren}
											</th>
										),
										td: ({ children: tdChildren }) => (
											<td className='border border-zinc-300 dark:border-zinc-600 px-3 py-2'>
												{tdChildren}
											</td>
										),
										code: ({ className: codeClass, children: codeChildren, ...codeProps }) => {
											const isInline = !codeClass;
											return isInline ? (
												<code
													className='bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm font-mono'
													{...codeProps}>
													{codeChildren}
												</code>
											) : (
												<code
													className={classNames(
														'block bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 text-sm font-mono overflow-x-auto',
														codeClass,
													)}
													{...codeProps}>
													{codeChildren}
												</code>
											);
										},
									}}>
									{children}
								</ReactMarkdown>
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
							className={classNames('absolute -top-4', {
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
