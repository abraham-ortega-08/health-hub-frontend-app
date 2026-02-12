export interface DocumentMetadata {
	name: string;
	fragment: string;
	similarity: string;
}

export interface UploadedFile {
	name: string;
	documentId: string;
}

export interface Message {
	id: string;
	content: string;
	isAnswer: boolean;
	timestamp: number;
	documents?: DocumentMetadata[];
	uploadedFiles?: UploadedFile[];
	isStreaming?: boolean;
}

export interface ChatSession {
	sessionId: string;
	messages: Message[];
	createdAt: number;
}

export interface ChatQueryResponse {
	answer: string;
	documents?: DocumentMetadata[];
	uploadedFiles?: UploadedFile[];
}

// SSE Event Types
export type SSEEventType = 'stream_started' | 'progress' | 'metadata' | 'chunk' | 'complete' | 'cancelled' | 'error';

export type ProgressStage = 
	| 'initialization'
	| 'processing_files'
	| 'retrieving_context'
	| 'context_ready'
	| 'generating'
	| 'saving'
	| 'complete';

export interface ProgressInfo {
	stage: ProgressStage;
	percentage: number;
	message: string;
}

export interface StreamStartedEvent {
	type: 'stream_started';
	streamId: string;
}

export interface ProgressEvent {
	type: 'progress';
	progress: ProgressInfo;
}

export interface MetadataEvent {
	type: 'metadata';
	documents?: DocumentMetadata[];
	uploadedFiles?: UploadedFile[];
}

export interface ChunkEvent {
	type: 'chunk';
	content: string;
}

export interface CompleteEvent {
	type: 'complete';
}

export interface CancelledEvent {
	type: 'cancelled';
}

export interface ErrorEvent {
	type: 'error';
	error: string;
}

export type SSEEvent = 
	| StreamStartedEvent 
	| ProgressEvent 
	| MetadataEvent 
	| ChunkEvent 
	| CompleteEvent 
	| CancelledEvent 
	| ErrorEvent;
