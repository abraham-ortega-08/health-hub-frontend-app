export const appPages = {
	aiAppPages: {
		id: 'aiApp',
		to: '/ai',
		text: 'AI',
		icon: 'HeroRocketLaunch',
		subPages: {
			aiDashboardPage: {
				id: 'aiDashboardPage',
				to: '/ai/dashboard',
				text: 'AI Dashboard',
				icon: 'HeroRocketLaunch',
			},
		},
	},
	knowledgePage: {
		id: 'knowledgePage',
		to: '/knowledge',
		text: 'Knowledge Base',
		icon: 'HeroBookOpen',
	},
};

export const componentsPages = {};

export const authPages = {
	loginPage: {
		id: 'loginPage',
		to: '/login',
		text: 'Login',
		icon: 'HeroArrowRightOnRectangle',
	},
	profilePage: {
		id: 'profilePage',
		to: '/profile',
		text: 'Profile',
		icon: 'HeroUser',
	},
};

const pagesConfig = {
	...authPages,
};

export default pagesConfig;
