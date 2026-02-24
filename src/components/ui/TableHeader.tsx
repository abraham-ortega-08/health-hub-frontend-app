import React, { FC } from 'react';
import { THead, Tr, Th } from '@/components/ui/Table';

export interface TableColumn {
	label: string;
	className?: string;
}

interface TableHeaderProps {
	columns: (string | TableColumn)[];
}

const BASE_TH_CLASS =
	'text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider';

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
	return (
		<THead>
			<Tr>
				{columns.map((col, index) => {
					const label = typeof col === 'string' ? col : col.label;
					const extra = typeof col === 'string' ? '' : (col.className ?? '');
					return (
						<Th key={index} className={`${BASE_TH_CLASS} ${extra}`.trim()}>
							{label}
						</Th>
					);
				})}
			</Tr>
		</THead>
	);
};

export default TableHeader;
