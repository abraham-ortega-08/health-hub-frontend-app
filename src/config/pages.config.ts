export const appPages = {
	aiAppPages: {
		id: 'aiApp',
		to: '/ai',
		text: 'AI',
		icon: 'heroicons:rocket-launch',
		subPages: {
			aiChatPage: {
				id: 'aiChatPage',
				to: '/ai/chat',
				text: 'Chat',
				icon: 'heroicons:chat-bubble-bottom-center-text',
			},
			aiAgentsPage: {
				id: 'aiAgentsPage',
				to: '/ai/agents',
				text: 'Agents',
				icon: 'heroicons:cpu-chip',
			},
		},
	},
	knowledgePage: {
		id: 'knowledgePage',
		to: '/knowledge',
		text: 'Knowledge Base',
		icon: 'heroicons:book-open',
	},
};

export const componentsPages = {};

export const authPages = {

	loginPage: {
		id: 'loginPage',
		to: '/login',
		text: 'Login',
		icon: 'heroicons:arrow-right-on-rectangle',
	},
	profilePage: {
		id: 'profilePage',
		to: '/profile',
		text: 'Profile',
		icon: 'heroicons:user',
	},
};

const pagesConfig = {
	...authPages,
};

export default pagesConfig;
