export interface Message {
	id: string;
	content: string;
	isAnswer: boolean;
	timestamp: number;
}

export interface ChatSession {
	sessionId: string;
	messages: Message[];
	createdAt: number;
}

export interface ChatQueryResponse {
	answer: string;
	documents?: string[];
}
