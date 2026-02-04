import React from 'react';
import { authPages } from '@/config/pages.config';
import { TRoute } from '@/types/route.type';
import DefaultHeaderTemplate from '../templates/layouts/Headers/DefaultHeader.template';

const headerRoutes: TRoute[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: '/*', element: <DefaultHeaderTemplate /> },
];

export default headerRoutes;
