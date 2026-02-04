'use client';

import React from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Button from '@/components/ui/Button';
import LogoTemplate from '@/templates/layouts/Logo/Logo.template';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
	const router = useRouter();

	const handleLogin = () => {
		// Simplemente redirigir al home sin autenticación
		router.push('/');
	};

	return (
		<PageWrapper className='bg-white dark:bg-inherit'>
			<div className='container mx-auto flex h-full items-center justify-center'>
				<div className='flex w-full max-w-md flex-col gap-8 rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900'>
					<div className='flex flex-col items-center gap-4'>
						<Link href='/' aria-label='Logo'>
							<LogoTemplate className='h-16' />
						</Link>
					</div>
					<div className='flex flex-col items-center gap-2'>
						<span className='text-4xl font-bold'>Welcome Back</span>
						<span className='text-zinc-500'>Sign in to continue to AI Chat</span>
					</div>
					<div className='flex flex-col gap-6'>
						<div>
							<Button
								size='lg'
								variant='solid'
								className='w-full font-semibold'
								onClick={handleLogin}>
								Sign in
							</Button>
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
