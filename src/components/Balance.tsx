import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { TRounded } from '@/types/rounded.type';
import { Icon } from '@iconify/react';
import themeConfig from '../config/theme.config';

interface IBalanceIconProps {
	status?: 'positive' | 'negative' | 'fixed';
	className?: string;
}
export const BalanceIcon: FC<IBalanceIconProps> = (props) => {
	const { status = 'fixed', className } = props;
	return (
		<Icon
			className={classNames(
				'text-2xl',
				{
					'text-emerald-500': status === 'positive',
					'text-red-500': status === 'negative',
					'text-blue-500': status === 'fixed',
				},
				className
			)}
			icon={
				(status === 'positive' && 'heroicons:arrow-trending-up') ||
				(status === 'negative' && 'heroicons:arrow-trending-down') ||
				'heroicons:arrows-right-left'
			}
		/>
	);
};

interface IBalanceProps {
	children?: ReactNode;
	className?: string;
	status?: 'positive' | 'negative' | 'fixed';
	value?: number | string;
	rounded?: TRounded;
}

const Balance: FC<IBalanceProps> = (props) => {
	const {
		children,
		className,
		status = 'fixed',
		value,
		rounded = themeConfig.rounded,
		...rest
	} = props;

	return (
		<div
			data-component-name='Balance'
			className={classNames(
				'flex items-center gap-2 bg-zinc-950/5 p-2 dark:bg-zinc-950/50',
				[`${rounded}`],
				className,
			)}
			{...rest}>
			<BalanceIcon status={status} />
			<span
				className={classNames({
					'text-emerald-500': status === 'positive',
					'text-red-500': status === 'negative',
					'text-blue-500': status === 'fixed',
				})}>
				{value}
			</span>
			{children && <span className='text-zinc-500'>{children}</span>}
		</div>
	);
};
Balance.displayName = 'Balance';

export default Balance;
