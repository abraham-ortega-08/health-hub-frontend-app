'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Container from '@/components/layouts/Container/Container';
import Button from '@/components/ui/Button';

export const AgentDetailNotFound: React.FC = () => {
	const router = useRouter();

	return (
		<PageWrapper>
			<Container>
				<div className='flex flex-col items-center justify-center py-16'>
					<Icon icon='heroicons:exclamation-triangle' className='w-16 h-16 text-zinc-400 mb-4' />
					<h3 className='text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2'>
						Agent not found
					</h3>
					<Button onClick={() => router.back()}>Go back</Button>
				</div>
			</Container>
		</PageWrapper>
	);
};
