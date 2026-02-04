'use client';

import React, { useState, use } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Button from '@/components/ui/Button';
import classNames from 'classnames';
import { useFormik } from 'formik';
import usersDb from '@/mocks/db/users.db';
import LogoTemplate from '@/templates/layouts/Logo/Logo.template';
import Validation from '@/components/form/Validation';
import FieldWrap from '@/components/form/FieldWrap';
import Icon from '@/components/icon/Icon';
import Input from '@/components/form/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type TValues = {
	username: string;
	password: string;
};

const LoginPage = ({
	searchParams,
}: {
	searchParams: Promise<Record<'callbackUrl' | 'error', string>>;
}) => {
	const router = useRouter();
	const params = use(searchParams);

	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			username: usersDb[5].username,
			password: usersDb[5].password,
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.username) {
				errors.username = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (values: TValues, { setFieldError }) => {
			const res = await signIn('credentials', {
				username: values.username,
				password: values.password,
				redirect: false,
			});

			if (!res?.error) {
				router.push(params?.callbackUrl ?? (process.env.NEXT_PUBLIC_URL as string));
			}
		},
	});

	return (
		<PageWrapper className='bg-white dark:bg-inherit'>
			<div className='container mx-auto flex h-full items-center justify-center'>
				<div className='flex w-full max-w-md flex-col gap-8 rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900'>
					<div className='flex flex-col items-center gap-4'>
						<Link href='/' aria-label='Logo'>
							<LogoTemplate className='h-16' />
						</Link>
					</div>
					<div className='flex flex-col items-center gap-2'>
						<span className='text-4xl font-bold'>Welcome Back</span>
						<span className='text-zinc-500'>Sign in to continue to AI Chat</span>
					</div>
					<form className='flex flex-col gap-6' noValidate>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.username}
								invalidFeedback={formik.errors.username}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroEnvelope' className='mx-2 text-zinc-400' />}>
									<Input
										dimension='lg'
										id='username'
										autoComplete='username'
										name='username'
										placeholder='Email or username'
										value={formik.values.username}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='pl-12'
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.password}
								invalidFeedback={formik.errors.password}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroKey' className='mx-2 text-zinc-400' />}
									lastSuffix={
										<Icon
											className='mx-2 cursor-pointer text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
											icon={passwordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
											onClick={() => {
												setPasswordShowStatus(!passwordShowStatus);
											}}
										/>
									}>
									<Input
										dimension='lg'
										type={passwordShowStatus ? 'text' : 'password'}
										autoComplete='current-password'
										id='password'
										name='password'
										placeholder='Password'
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className='pl-12'
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div>
							<Button
								size='lg'
								variant='solid'
								className='w-full font-semibold'
								onClick={() => formik.handleSubmit()}>
								Sign in
							</Button>
						</div>
					</form>
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
