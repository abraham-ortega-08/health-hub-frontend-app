import React, { FC, ReactNode } from 'react';
import Card, { CardBody } from '@/components/ui/Card';

interface ChatInputContainerProps {
	children: ReactNode;
}

const ChatInputContainer: FC<ChatInputContainerProps> = ({ children }) => {
	return (
		<div className='sticky bottom-0 z-20 flex bg-zinc-100/75 pb-6 backdrop-blur-md dark:bg-zinc-950/75'>
			<div className='grid w-full grid-cols-12 gap-4'>
				<div className='col-span-12'>
					<Card>
						<CardBody>{children}</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ChatInputContainer;
