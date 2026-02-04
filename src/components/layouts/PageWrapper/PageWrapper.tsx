'use client';

import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface IPageWrapperProps {
	children: ReactNode;
	className?: string;
}
const PageWrapper: FC<IPageWrapperProps> = (props) => {
	const { children, className = undefined, ...rest } = props;

	return (
		<main
			data-component-name='PageWrapper'
			className={classNames('flex shrink-0 grow flex-col', className)}
			{...rest}>
			{children}
		</main>
	);
};

export default PageWrapper;
