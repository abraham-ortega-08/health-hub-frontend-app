import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatSession, Message } from '../types';

interface ChatStore {
	sessions: Record<string, ChatSession>;
	currentSessionId: string | null;
	createSession: () => string;
	addMessage: (sessionId: string, message: Message) => void;
	getCurrentSession: () => ChatSession | null;
}

export const useChatStore = create<ChatStore>()(
	persist(
		(set, get) => ({
			sessions: {},
			currentSessionId: null,
			
			createSession: () => {
				const sessionId = crypto.randomUUID();
				const newSession: ChatSession = {
					sessionId,
					messages: [],
					createdAt: Date.now(),
				};
				
				set((state) => ({
					sessions: {
						...state.sessions,
						[sessionId]: newSession,
					},
					currentSessionId: sessionId,
				}));
				
				return sessionId;
			},
			
			addMessage: (sessionId, message) => {
				set((state) => {
					const session = state.sessions[sessionId];
					if (!session) return state;
					
					return {
						sessions: {
							...state.sessions,
							[sessionId]: {
								...session,
								messages: [...session.messages, message],
							},
						},
					};
				});
			},
			
			getCurrentSession: () => {
				const { currentSessionId, sessions } = get();
				if (!currentSessionId) return null;
				return sessions[currentSessionId] || null;
			},
		}),
		{
			name: 'chat-storage',
		}
	)
);
