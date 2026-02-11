export interface Message {
	id: string;
	content: string;
	isAnswer: boolean;
	timestamp: number;
	documents?: Array<{
		name: string;
		fragment: string;
		similarity: string;
	}>;
}

export interface ChatSession {
	sessionId: string;
	messages: Message[];
	createdAt: number;
}

export interface ChatQueryResponse {
	answer: string;
	documents?: Array<{
		name: string;
		fragment: string;
		similarity: string;
	}>;
}
