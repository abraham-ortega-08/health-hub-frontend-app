import React, { FC } from 'react';
import { ProgressInfo } from '../types';
import classNames from 'classnames';

interface ProgressIndicatorProps {
	progress: ProgressInfo;
	className?: string;
	compact?: boolean;
}

/**
 * Componente de progreso circular compacto para streaming
 * Usa un solo color primary para consistencia visual
 */
const ProgressIndicator: FC<ProgressIndicatorProps> = ({ progress, className, compact = false }) => {
	const { percentage, message } = progress;

	// SVG circle properties - más pequeño y compacto
	const size = compact ? 32 : 50;
	const strokeWidth = compact ? 3 : 4;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - (percentage / 100) * circumference;

	// Usar colores primary consistentes
	const strokeColor = 'stroke-blue-500 dark:stroke-blue-400';
	const textColor = 'text-blue-600 dark:text-blue-400';

	return (
		<div className={classNames('flex items-center gap-2.5', className)}>
			{/* Circular Progress - Compacto */}
			<div className='relative flex-shrink-0'>
				<svg
					width={size}
					height={size}
					className='transform -rotate-90'
				>
					{/* Background circle */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						className='stroke-zinc-200 dark:stroke-zinc-700'
						strokeWidth={strokeWidth}
						fill='none'
					/>
					{/* Progress circle */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						className={classNames(strokeColor, 'transition-all duration-500 ease-out')}
						strokeWidth={strokeWidth}
						fill='none'
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap='round'
					/>
				</svg>
				
				{/* Center percentage */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<span className={classNames(
						'font-bold',
						compact ? 'text-[9px]' : 'text-xs',
						textColor
					)}>
						{percentage}%
					</span>
				</div>
			</div>

			{/* Status text - Compacto */}
			<div className='flex items-center gap-2 min-w-0 flex-1'>
				<span className='text-lg'>✨</span>
				<span className={classNames(
					'font-medium truncate',
					compact ? 'text-xs' : 'text-sm',
					'text-zinc-600 dark:text-zinc-400'
				)}>
					{message}
				</span>
			</div>
		</div>
	);
};

export default ProgressIndicator;
