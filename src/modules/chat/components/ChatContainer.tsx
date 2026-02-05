import React, { FC, ReactNode } from 'react';

interface ChatContainerProps {
	children: ReactNode;
}

const ChatContainer: FC<ChatContainerProps> = ({ children }) => {
	return (
		<div className='flex h-full flex-wrap content-start'>
			<div className='grid w-full grid-cols-12 gap-4'>{children}</div>
		</div>
	);
};

export default ChatContainer;
