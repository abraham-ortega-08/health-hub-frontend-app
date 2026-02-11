'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { appPages } from '@/config/pages.config';
import { Icon } from '@iconify/react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/form/Input';
import FieldWrap from '../../../../components/form/FieldWrap';
import useDomRect from '../../../../hooks/useDomRect';
import Badge from '../../../../components/ui/Badge';
import Modal, { ModalBody, ModalHeader } from '../../../../components/ui/Modal';
import { useTranslation } from 'react-i18next';
import TranslationsProvider from '@/components/TranslationsProvider';
import { useCurrentLocale } from 'next-i18n-router/client';
import i18nConfig from '../../../../../i18nConfig';

const i18nNamespaces = ['translation'];

const SearchPartialContent = () => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	// @ts-ignore
	const [domRect] = useDomRect(ref);
	const [searchField, setSearchField] = useState('');

	const leftContent = <Icon icon='heroicons:magnifying-glass' className='mx-2 w-5 h-5 text-zinc-500 dark:text-zinc-400' />;
	const rightContent = searchField ? (
		<Button
			icon='heroicons:x-mark'
			color='red'
			size='sm'
			rounded='rounded'
			className=''
			onClick={() => setSearchField('')}
		/>
	) : (
		<Button
			variant='solid'
			color='blue'
			size='sm'
			rounded='rounded'
			className='!px-2 font-bold'>
			⌘ K
		</Button>
	);

	const list = [
		{ ...appPages.aiAppPages.subPages.aiChatPage, category: 'AI' },
		{ ...appPages.aiAppPages.subPages.aiAgentsPage, category: 'AI' },
		{ ...appPages.knowledgePage, category: 'Knowledge' },
	];
	const result = list.filter(
		(key) =>
			t(key.text).toLowerCase().includes(searchField.toLowerCase()) ||
			key.category.toLowerCase().includes(searchField.toLowerCase()),
	);

	const inputRef = useRef<HTMLInputElement>(null);
	const focusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'k' && event.metaKey) {
				focusInput();
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const [modalStatus, setModalStatus] = useState<boolean>(false);

	return (
		<div className='relative'>
			{/* For Desktop :: BEGIN */}
			<FieldWrap
				ref={ref}
				firstSuffix={leftContent}
				lastSuffix={rightContent}
				className='z-20 max-sm:hidden'>
				<Input
					ref={inputRef}
					name='searchField'
					placeholder='Search or type a command'
					className='min-w-[22rem]'
					value={searchField}
					onChange={(e) => setSearchField(e.target.value)}
					autoComplete='off'
				/>
			</FieldWrap>
			{searchField && (
				<div
					className='absolute top-0 z-10 h-auto w-full rounded-lg bg-white shadow-2xl outline outline-8 outline-white ring-2 ring-gray-100 ring-offset-8 dark:bg-zinc-950 dark:outline-zinc-950 dark:ring-zinc-800/50 max-sm:hidden'
					style={{ paddingTop: domRect?.height }}>
					<div className='max-h-96 divide-y divide-dashed divide-zinc-500/50 overflow-auto bg-white px-4 dark:bg-zinc-950 [&>*]:py-4'>
						{result.length ? (
							result.map((i) => (
								<Link
									key={i.id}
									href={`../${i.to}`}
									className='flex items-center gap-2'>
									<div className='grow'>
										<Button className='!p-0' icon={i.icon}>
											<span
												dangerouslySetInnerHTML={{
													__html: t(i.text).replace(
														new RegExp(searchField, 'gi'),
														`<span class='bg-amber-500/50 text-zinc-950'>$&</span>`,
													),
												}}
											/>
										</Button>
									</div>
					{i.category && (
						<div className='flex-shrink-0'>
							<Badge
								variant='outline'
								className='border-transparent text-xs'>
								<span
									dangerouslySetInnerHTML={{
										__html: i.category.replace(
											new RegExp(
												searchField,
												'gi',
											),
											`<span class='bg-amber-500/50 text-zinc-950'>$&</span>`,
										),
									}}
								/>
							</Badge>
						</div>
					)}
								</Link>
							))
						) : (
							<div className='flex gap-2 text-zinc-500'>No result.</div>
						)}
					</div>
				</div>
			)}
			{/* For Desktop :: END */}

			{/* For Mobile :: BEGIN */}
		<Button
			icon='heroicons:magnifying-glass'
			className='!bg-amber-500 sm:hidden'
				onClick={() => setModalStatus(true)}
			/>
			<Modal isOpen={modalStatus} setIsOpen={setModalStatus}>
				<ModalHeader>Search</ModalHeader>
				<ModalBody>
					<FieldWrap firstSuffix={leftContent} lastSuffix={rightContent} className='z-20'>
						<Input
							name='searchField'
							placeholder='Search or type a command'
							className='min-w-[22rem]'
							value={searchField}
							onChange={(e) => setSearchField(e.target.value)}
							autoComplete='off'
						/>
					</FieldWrap>
					{searchField && (
						<div className='z-10 h-auto w-full bg-white dark:bg-zinc-950 dark:outline-zinc-950 dark:ring-zinc-800/50 sm:hidden'>
							<div className='max-h-96 divide-y divide-dashed divide-zinc-500/50 overflow-auto bg-white dark:bg-zinc-950 [&>*]:py-4'>
								{result.length ? (
									result.map((i) => (
										<Link
											key={i.id}
											href={`../${i.to}`}
											className='flex items-center gap-2'>
											<div className='grow'>
												<Button className='!p-0' icon={i.icon}>
													<span
														dangerouslySetInnerHTML={{
															__html: t(i.text).replace(
																new RegExp(
																	searchField,
																	'gi',
																),
																`<span class='bg-amber-500/50 text-zinc-950'>$&</span>`,
															),
														}}
													/>
												</Button>
											</div>
					{i.category && (
						<div className='flex-shrink-0'>
							<Badge
								variant='outline'
								className='border-transparent text-xs'>
								<span
									dangerouslySetInnerHTML={{
										__html: i.category.replace(
											new RegExp(
												searchField,
												'gi',
											),
											`<span class='bg-amber-500/50 text-zinc-950'>$&</span>`,
										),
									}}
								/>
							</Badge>
						</div>
					)}
										</Link>
									))
								) : (
									<div className='flex gap-2 text-zinc-500'>No result.</div>
								)}
							</div>
						</div>
					)}
				</ModalBody>
			</Modal>
			{/* For Mobile :: END */}
		</div>
	);
};

const SearchPartial = () => {
	const locale = useCurrentLocale(i18nConfig);

	return (
		<TranslationsProvider namespaces={i18nNamespaces} locale={locale || 'en'}>
			<SearchPartialContent />
		</TranslationsProvider>
	);
};

export default SearchPartial;
