'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';

export const AgentDetailLoading: React.FC = () => {
	return (
		<PageWrapper>
			<Container>
				<div className='flex items-center justify-center py-16'>
					<Icon icon='mdi:loading' className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</Container>
		</PageWrapper>
	);
};
