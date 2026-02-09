import React from 'react';
import Link from 'next/link';
import Visible from '../../../../components/utils/Visible';
import { Icon } from '@iconify/react';
import useAsideStatus from '../../../../hooks/useAsideStatus';
import LogoTemplate from '../../Logo/Logo.template';

const LogoAndAsideTogglePart = () => {
	const { asideStatus, setAsideStatus } = useAsideStatus();
	return (
		<>
			<Visible is={asideStatus}>
				<Link href='/' aria-label='Logo'>
					<LogoTemplate className='h-12' />
				</Link>
			</Visible>
			<button
				type='button'
				aria-label='Toggle Aside Menu'
				onClick={() => setAsideStatus(!asideStatus)}
				className='flex h-12 w-12 items-center justify-center'>
				<Icon
					icon={asideStatus ? 'heroicons:bars-3-bottom-left' : 'heroicons:bars-3'}
					className='text-2xl'
				/>
			</button>
		</>
	);
};

export default LogoAndAsideTogglePart;
