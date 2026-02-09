export interface Agent {
	id: string;
	name: string;
	description: string;
	model: string;
	is_default: boolean;
	is_active: boolean;
	prompt_config: {
		SYSTEM_ROLE: string;
		RESPONSE_FORMAT: string;
		RESPONSE_STRUCTURE: string;
		ADDITIONAL_SECTIONS?: Record<string, string>;
		COMMUNICATION_STYLE: string;
		NO_CONTEXT_AVAILABLE: string;
	};
	model_config: {
		max_tokens: number;
		temperature: number;
		max_current_chunks: number;
		max_history_messages: number;
		max_historical_chunks: number;
	};
	created_at: string;
	updated_at: string;
	created_by: string;
	document_count: number;
}

export interface AgentsResponse {
	items: Agent[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface AgentsQueryParams {
	page?: number;
	limit?: number;
	is_active?: boolean;
}

// AgentDocument now extends the base Document structure from knowledge
export interface AgentDocument {
	id: string;
	name: string;
	type: 'FIXED' | 'DYNAMIC';
	user_id: string | null;
	session_id: string | null;
	created_at: string;
	file_url: string | null;
	file_key: string | null;
	file_size: number;
	mime_type: string;
	assigned_at: string;
	assigned_by: string;
	chunk_count: number;
}

export interface AgentDocumentsResponse {
	items: AgentDocument[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface AgentDocumentsQueryParams {
	page?: number;
	limit?: number;
	includeContent?: boolean;
}
