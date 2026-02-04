import React from 'react';
import { appPages } from '@/config/pages.config';
import Subheader, { SubheaderRight } from '@/components/layouts/Subheader/Subheader';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const AiSubheaderPartial = () => {
	return (
		<Subheader>
			<SubheaderRight>
				<Link href={`${appPages.aiAppPages.subPages.aiDashboardPage.to}`}>
					<Button variant='solid' icon='HeroPlus'>
						New Chat
					</Button>
				</Link>
			</SubheaderRight>
		</Subheader>
	);
};

export default AiSubheaderPartial;
