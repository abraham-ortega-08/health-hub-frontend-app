'use client';

import React, { useEffect, useRef } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import classNames from 'classnames';
import AiSubheaderPartial from '../_partial/AiSubheader.partial';
import LoaderDotsCommon from '@/components/LoaderDots.common';
import { useChat, ChatContainer, ChatMessage, ChatInput, ChatInputContainer } from '@/modules/chat';

const AiDashboardClient = () => {
	const { currentSession, sendMessage, isLoading, selectedFiles, addFiles, removeFile, clearFiles } = useChat();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentSession?.messages, isLoading]);

	return (
		<PageWrapper>
			<AiSubheaderPartial />
			<Container className='flex shrink-0 grow basis-auto flex-col pb-0 overflow-hidden'>
				<div ref={containerRef} className='flex-1 overflow-y-auto pb-6'>
					<ChatContainer>
						{currentSession && currentSession.messages.length > 0 ? (
							<>
								{currentSession.messages.map((msg) => (
									<ChatMessage key={msg.id} isAnswer={msg.isAnswer}>
										{msg.content}
									</ChatMessage>
								))}
								{isLoading && (
									<ChatMessage isAnswer>
										<div className='flex items-center gap-3'>
											<LoaderDotsCommon />
											<span className='text-sm text-zinc-500 dark:text-zinc-400'>
												AI is thinking...
											</span>
										</div>
									</ChatMessage>
								)}
								<div ref={messagesEndRef} className='h-20' />
							</>
						) : (
							<div className='col-span-12 my-20'>
								<div className='mb-4 text-center text-6xl font-semibold'>
									<span
										className={classNames(
											'animate-pulse bg-gradient-to-r bg-clip-text text-transparent',
											'from-pink-500 via-sky-500 to-violet-500',
											'hover:from-sky-500 hover:via-violet-500 hover:to-amber-500',
											'transition duration-1000 ease-in-out',
										)}>
										⚡️Go beyond your limits with AI
									</span>
								</div>
								<div className='text-center text-2xl text-zinc-500'>
									Chat with the smartest AI - experience the power of AI with us
								</div>
							</div>
						)}
					</ChatContainer>
				</div>
				<ChatInputContainer>
					<ChatInput
						onSend={sendMessage}
						files={selectedFiles}
						onAddFiles={addFiles}
						onRemoveFile={removeFile}
						onClearFiles={clearFiles}
						disabled={isLoading}
					/>
				</ChatInputContainer>
			</Container>
		</PageWrapper>
	);
};

export default AiDashboardClient;
