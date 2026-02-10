/**
 * Available AI Models for Agents
 */
export const AI_MODELS = [
	{ value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
	{ value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
	{ value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
] as const;

/**
 * Model Configuration Limits
 */
export const MODEL_CONFIG_LIMITS = {
	TEMPERATURE: {
		MIN: 0,
		MAX: 2,
		STEP: 0.1,
		DEFAULT: 0.7,
	},
	MAX_TOKENS: {
		MIN: 1,
		MAX: 100000,
		STEP: 1,
		DEFAULT: 4096,
	},
	MAX_CURRENT_CHUNKS: {
		MIN: 1,
		MAX: 100,
		STEP: 1,
		DEFAULT: 5,
	},
	MAX_HISTORY_MESSAGES: {
		MIN: 1,
		MAX: 100,
		STEP: 1,
		DEFAULT: 15,
	},
	MAX_HISTORICAL_CHUNKS: {
		MIN: 1,
		MAX: 100,
		STEP: 1,
		DEFAULT: 10,
	},
} as const;

/**
 * Field Descriptions for UI
 */
export const FIELD_DESCRIPTIONS = {
	TEMPERATURE: 'Controls randomness in responses (0 = deterministic, 2 = very random)',
	MAX_TOKENS: 'Maximum number of tokens in the response',
	MAX_CURRENT_CHUNKS: 'Maximum number of current document chunks to use',
	MAX_HISTORY_MESSAGES: 'Maximum number of previous messages to include in context',
	MAX_HISTORICAL_CHUNKS: 'Maximum number of historical document chunks to retrieve',
	AGENT_NAME: 'A descriptive name for your agent',
	AGENT_DESCRIPTION: "Brief description of the agent's purpose and capabilities",
	AI_MODEL: 'Select the AI model to power this agent',
	IS_DEFAULT: 'Make this the default agent for new conversations',
	PROMPT_CONFIG: 'Define custom prompt keys and values. You can add or remove any keys.',
} as const;

/**
 * Field Placeholders
 */
export const FIELD_PLACEHOLDERS = {
	AGENT_NAME: 'e.g., Lab Results Specialist',
	AGENT_DESCRIPTION: 'Describe what this agent specializes in...',
	NEW_KEY_NAME: 'NEW_KEY_NAME',
	KEY_VALUE: 'Enter value...',
} as const;

/**
 * Textarea Row Defaults
 */
export const TEXTAREA_ROWS = {
	DESCRIPTION: 4,
	PROMPT_VALUE: 3,
	JSON_EDITOR: 20,
} as const;
