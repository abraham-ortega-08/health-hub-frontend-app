import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import Card, { CardBody, CardFooter, CardFooterChild } from '@/components/ui/Card';
import Avatar from '@/components/Avatar';
import { UserBrainThumb } from '@/assets/images';
import { StaticImageData } from 'next/image';
import ReactMarkdown from 'react-markdown';
import DocumentReference from './DocumentReference';

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
	isAnswer?: boolean;
	userImage?: string | StaticImageData;
	userName?: string;
	documents?: Array<{
		name: string;
		fragment: string;
		similarity: string;
	}>;
}

const ChatMessage: FC<ChatMessageProps> = (props) => {
	const { children, className, isAnswer = false, userImage, userName = 'AI', documents, ...rest } = props;
	
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
					<div className='prose prose-sm dark:prose-invert max-w-none'>
						{typeof children === 'string' ? (
							<ReactMarkdown>{children}</ReactMarkdown>
						) : (
							children
						)}
					</div>
					{isAnswer && documents && <DocumentReference documents={documents} />}
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
