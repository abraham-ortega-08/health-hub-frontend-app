'use client';

import  { useRef } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import classNames from 'classnames';
import { useStreamingChat, ChatContainer, ChatMessage, ChatInput, ChatInputContainer, ChatSubheader } from '@/modules/chat';

const AiDashboardClient = () => {
	const { 
		currentSession, 
		sendMessage, 
		cancelStream,
		isStreaming,
		progress,
		selectedFiles, 
		addFiles, 
		removeFile, 
		clearFiles 
	} = useStreamingChat();
	
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<PageWrapper>
			<ChatSubheader />
			<Container className='flex shrink-0 grow basis-auto flex-col pb-0 overflow-hidden'>
				<div ref={containerRef} className='flex-1 overflow-y-auto pb-6'>
					<ChatContainer>
						{currentSession && currentSession.messages.length > 0 ? (
							<>
								{currentSession.messages.map((msg) => (
									<ChatMessage 
										key={msg.id} 
										isAnswer={msg.isAnswer}
										documents={msg.documents}
										isStreaming={msg.isStreaming}
										progress={msg.isStreaming ? progress : null}
									>
										{msg.content}
									</ChatMessage>
								))}
								<div ref={messagesEndRef} className='h-40' />
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
						onCancel={cancelStream}
						files={selectedFiles}
						onAddFiles={addFiles}
						onRemoveFile={removeFile}
						onClearFiles={clearFiles}
						disabled={false}
						isStreaming={isStreaming}
					/>
				</ChatInputContainer>
			</Container>
		</PageWrapper>
	);
};

export default AiDashboardClient;
