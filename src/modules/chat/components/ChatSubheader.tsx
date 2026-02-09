'use client';

import React from 'react';
import Subheader, { SubheaderRight } from '@/components/layouts/Subheader/Subheader';
import Button from '@/components/ui/Button';
import { useChatStore } from '../store';

const ChatSubheader = () => {
	const { createSession } = useChatStore();

	return (
		<Subheader>
			<SubheaderRight>
				<Button variant='solid' icon='heroicons:plus' onClick={createSession}>
					New Chat
				</Button>
			</SubheaderRight>
		</Subheader>
	);
};

export default ChatSubheader;
