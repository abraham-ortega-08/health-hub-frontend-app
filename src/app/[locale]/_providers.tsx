'use client';

import React, { ReactNode } from 'react';
import { ThemeContextProvider } from '@/context/themeContext';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeContextProvider>
			<ReactQueryProvider>
				{children}
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</ReactQueryProvider>
		</ThemeContextProvider>
	);
};

export default Providers;
