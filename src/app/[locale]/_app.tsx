'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import useFontSize from '@/hooks/useFontSize';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import getOS from '@/utils/getOS.util';

const AppWrapper = ({ children }: { children: ReactNode }) => {
	const { fontSize } = useFontSize();
	const [mounted, setMounted] = useState(false);
	dayjs.extend(localizedFormat);

	useEffect(() => {
		setMounted(true);
		getOS();
	}, []);

	return (
		<main className='flex flex-col flex-1'>
			{mounted && <style>{`:root {font-size: ${fontSize}px}`}</style>}
			{children}
		</main>
	);
};


export default AppWrapper;
