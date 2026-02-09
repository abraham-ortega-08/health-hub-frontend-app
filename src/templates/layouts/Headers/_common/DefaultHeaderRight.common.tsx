import React from 'react';
import Mounted from '@/components/Mounted';
import Button from '@/components/ui/Button';
import SettingsPartial from '../_partial/Settings.partial';
import LanguageSelectorPartial from '../_partial/LanguageSelector.partial';

const DefaultHeaderRightCommon = () => {
	return (
		<>
			<SettingsPartial />
			<Mounted
				fallback={<Button icon='heroicons:language' aria-label='Select Language' isDisable />}>
				<LanguageSelectorPartial />
			</Mounted>
		</>
	);
};

export default DefaultHeaderRightCommon;
