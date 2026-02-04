import React from 'react';
import { NavItem, NavSeparator } from '@/components/layouts/Navigation/Nav';
import { authPages } from '@/config/pages.config';
import Icon from '@/components/icon/Icon';
import Badge from '@/components/ui/Badge';
import User from '@/components/layouts/User/User';
import usersDb, { TUser } from '@/mocks/db/users.db';
import { useRouter } from 'next/navigation';

const UserTemplate = () => {
	const router = useRouter();
	// Usuario por defecto (índice 5)
	const userData: TUser = usersDb[5] as TUser;

	const handleLogout = () => {
		router.push('/login');
	};

	return (
		<User
			isLoading={false}
			name={userData?.firstName}
			nameSuffix={userData?.isVerified && <Icon icon='HeroCheckBadge' color='blue' />}
			position={userData?.position}
			src={userData?.image?.thumb}
			suffix={
				<Badge color='amber' variant='solid' className='text-xs font-bold'>
					AI
				</Badge>
			}>
			<NavSeparator />
			<NavItem {...authPages.profilePage} />
			<NavItem text='Logout' icon='HeroArrowRightOnRectangle' onClick={handleLogout} />
		</User>
	);
};

export default UserTemplate;
