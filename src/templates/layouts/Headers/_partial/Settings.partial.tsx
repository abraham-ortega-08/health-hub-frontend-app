'use client';

import React from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import ButtonGroup from '../../../../components/ui/ButtonGroup';
import DARK_MODE from '../../../../constants/darkMode.constant';
import useFontSize from '../../../../hooks/useFontSize';
import useDarkMode from '../../../../hooks/useDarkMode';

const SettingsPartial = () => {
	const { fontSize, setFontSize } = useFontSize();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	return (
		<Dropdown>
			<DropdownToggle hasIcon={false}>
				<Button icon='heroicons:cog-8-tooth' aria-label='Settings' />
			</DropdownToggle>
			<DropdownMenu placement='bottom-end'>
				<DropdownItem className='flex flex-col !items-start'>
					<div>Font Size:</div>
					<ButtonGroup>
						<Button
							icon='heroicons:minus'
							onClick={() => setFontSize(fontSize - 1)}
							isDisable={fontSize <= 12}
						/>
						<Button isDisable>{fontSize}</Button>
						<Button
							icon='heroicons:plus'
							onClick={() => setFontSize(fontSize + 1)}
							isDisable={fontSize >= 18}
						/>
					</ButtonGroup>
				</DropdownItem>
				<DropdownItem className='flex flex-col !items-start'>
					<div>Dark Mode:</div>
					<ButtonGroup>
						<Button
							icon='heroicons:moon'
							onClick={() => setDarkModeStatus(DARK_MODE.DARK)}
							isActive={darkModeStatus === DARK_MODE.DARK}
						/>
						<Button
							icon='heroicons:sun'
							onClick={() => setDarkModeStatus(DARK_MODE.LIGHT)}
							isActive={darkModeStatus === DARK_MODE.LIGHT}
						/>
						<Button
							icon='heroicons:computer-desktop'
							onClick={() => setDarkModeStatus(DARK_MODE.SYSTEM)}
							isActive={darkModeStatus === DARK_MODE.SYSTEM}
						/>
					</ButtonGroup>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default SettingsPartial;
