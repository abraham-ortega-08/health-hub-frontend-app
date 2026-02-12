import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatSession, Message, DocumentReference, UploadedFile } from '../types';

interface ChatStore {
	sessions: Record<string, ChatSession>;
	currentSessionId: string | null;
	createSession: () => string;
	addMessage: (sessionId: string, message: Message) => void;
	updateMessage: (sessionId: string, messageId: string, updates: Partial<Message>) => void;
	appendToMessage: (sessionId: string, messageId: string, content: string) => void;
	setMessageMetadata: (sessionId: string, messageId: string, documents?: DocumentReference[], uploadedFiles?: UploadedFile[]) => void;
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
			
			updateMessage: (sessionId, messageId, updates) => {
				set((state) => {
					const session = state.sessions[sessionId];
					if (!session) return state;
					
					const messageIndex = session.messages.findIndex(m => m.id === messageId);
					if (messageIndex === -1) return state;
					
					const updatedMessages = [...session.messages];
					updatedMessages[messageIndex] = {
						...updatedMessages[messageIndex],
						...updates,
					};
					
					return {
						sessions: {
							...state.sessions,
							[sessionId]: {
								...session,
								messages: updatedMessages,
							},
						},
					};
				});
			},
			
			appendToMessage: (sessionId, messageId, content) => {
				set((state) => {
					const session = state.sessions[sessionId];
					if (!session) return state;
					
					const messageIndex = session.messages.findIndex(m => m.id === messageId);
					if (messageIndex === -1) return state;
					
					const updatedMessages = [...session.messages];
					updatedMessages[messageIndex] = {
						...updatedMessages[messageIndex],
						content: updatedMessages[messageIndex].content + content,
					};
					
					return {
						sessions: {
							...state.sessions,
							[sessionId]: {
								...session,
								messages: updatedMessages,
							},
						},
					};
				});
			},
			
			setMessageMetadata: (sessionId, messageId, documents, uploadedFiles) => {
				set((state) => {
					const session = state.sessions[sessionId];
					if (!session) return state;
					
					const messageIndex = session.messages.findIndex(m => m.id === messageId);
					if (messageIndex === -1) return state;
					
					const updatedMessages = [...session.messages];
					updatedMessages[messageIndex] = {
						...updatedMessages[messageIndex],
						documents,
						uploadedFiles,
					};
					
					return {
						sessions: {
							...state.sessions,
							[sessionId]: {
								...session,
								messages: updatedMessages,
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
