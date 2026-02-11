import { z } from 'zod';
import { FieldConfig } from '../utils/fieldConfig';
import {
	AI_MODELS,
	MODEL_CONFIG_LIMITS,
	FIELD_DESCRIPTIONS,
	FIELD_PLACEHOLDERS,
	TEXTAREA_ROWS,
} from './agentConstants';

/**
 * Model Configuration Fields
 */
export const MODEL_CONFIG_FIELDS: FieldConfig[] = [
	{
		name: 'temperature',
		label: 'Temperature',
		type: 'number',
		min: MODEL_CONFIG_LIMITS.TEMPERATURE.MIN,
		max: MODEL_CONFIG_LIMITS.TEMPERATURE.MAX,
		step: MODEL_CONFIG_LIMITS.TEMPERATURE.STEP,
		defaultValue: MODEL_CONFIG_LIMITS.TEMPERATURE.DEFAULT,
		required: true,
		description: FIELD_DESCRIPTIONS.TEMPERATURE,
		validation: z.number().min(MODEL_CONFIG_LIMITS.TEMPERATURE.MIN).max(MODEL_CONFIG_LIMITS.TEMPERATURE.MAX),
	},
	{
		name: 'max_tokens',
		label: 'Max Tokens',
		type: 'number',
		min: MODEL_CONFIG_LIMITS.MAX_TOKENS.MIN,
		max: MODEL_CONFIG_LIMITS.MAX_TOKENS.MAX,
		step: MODEL_CONFIG_LIMITS.MAX_TOKENS.STEP,
		defaultValue: MODEL_CONFIG_LIMITS.MAX_TOKENS.DEFAULT,
		required: true,
		description: FIELD_DESCRIPTIONS.MAX_TOKENS,
		validation: z.number().int().positive(),
	},
	{
		name: 'max_current_chunks',
		label: 'Max Current Chunks',
		type: 'number',
		min: MODEL_CONFIG_LIMITS.MAX_CURRENT_CHUNKS.MIN,
		max: MODEL_CONFIG_LIMITS.MAX_CURRENT_CHUNKS.MAX,
		step: MODEL_CONFIG_LIMITS.MAX_CURRENT_CHUNKS.STEP,
		defaultValue: MODEL_CONFIG_LIMITS.MAX_CURRENT_CHUNKS.DEFAULT,
		required: true,
		description: FIELD_DESCRIPTIONS.MAX_CURRENT_CHUNKS,
		validation: z.number().int().positive(),
	},
	{
		name: 'max_history_messages',
		label: 'Max History Messages',
		type: 'number',
		min: MODEL_CONFIG_LIMITS.MAX_HISTORY_MESSAGES.MIN,
		max: MODEL_CONFIG_LIMITS.MAX_HISTORY_MESSAGES.MAX,
		step: MODEL_CONFIG_LIMITS.MAX_HISTORY_MESSAGES.STEP,
		defaultValue: MODEL_CONFIG_LIMITS.MAX_HISTORY_MESSAGES.DEFAULT,
		required: true,
		description: FIELD_DESCRIPTIONS.MAX_HISTORY_MESSAGES,
		validation: z.number().int().positive(),
	},
	{
		name: 'max_historical_chunks',
		label: 'Max Historical Chunks',
		type: 'number',
		min: MODEL_CONFIG_LIMITS.MAX_HISTORICAL_CHUNKS.MIN,
		max: MODEL_CONFIG_LIMITS.MAX_HISTORICAL_CHUNKS.MAX,
		step: MODEL_CONFIG_LIMITS.MAX_HISTORICAL_CHUNKS.STEP,
		defaultValue: MODEL_CONFIG_LIMITS.MAX_HISTORICAL_CHUNKS.DEFAULT,
		required: true,
		description: FIELD_DESCRIPTIONS.MAX_HISTORICAL_CHUNKS,
		validation: z.number().int().positive(),
	},
] as const;

/**
 * Basic Info Fields
 */
export const BASIC_INFO_FIELDS: FieldConfig[] = [
	{
		name: 'name',
		label: 'Agent Name',
		type: 'text',
		required: true,
		placeholder: FIELD_PLACEHOLDERS.AGENT_NAME,
		description: FIELD_DESCRIPTIONS.AGENT_NAME,
		validation: z.string().min(1, 'Name is required'),
	},
	{
		name: 'description',
		label: 'Description',
		type: 'textarea',
		rows: TEXTAREA_ROWS.DESCRIPTION,
		required: true,
		placeholder: FIELD_PLACEHOLDERS.AGENT_DESCRIPTION,
		description: FIELD_DESCRIPTIONS.AGENT_DESCRIPTION,
		validation: z.string().min(1, 'Description is required'),
	},
	{
		name: 'model',
		label: 'AI Model',
		type: 'select',
		options: [...AI_MODELS],
		required: true,
		description: FIELD_DESCRIPTIONS.AI_MODEL,
		validation: z.string().min(1, 'Model is required'),
	},
	{
		name: 'is_default',
		label: 'Set as Default Agent',
		type: 'boolean',
		defaultValue: false,
		description: FIELD_DESCRIPTIONS.IS_DEFAULT,
		validation: z.boolean(),
	},
] as const;

/**
 * Prompt Config Fields (Fixed: system_prompt and no_context_prompt)
 */
export const PROMPT_CONFIG_FIELDS: FieldConfig[] = [
	{
		name: 'system_prompt',
		label: 'System Prompt',
		type: 'markdown',
		rows: TEXTAREA_ROWS.PROMPT,
		required: true,
		placeholder: 'Enter the system prompt in markdown format...',
		description: 'Main system prompt that defines the agent behavior and capabilities',
		validation: z.string().min(1, 'System prompt is required'),
	},
	{
		name: 'no_context_prompt',
		label: 'No Context Prompt',
		type: 'markdown',
		rows: TEXTAREA_ROWS.PROMPT,
		required: true,
		placeholder: 'Enter the fallback prompt when no context is available...',
		description: 'Fallback prompt used when no relevant documents are found',
		validation: z.string().min(1, 'No context prompt is required'),
	},
] as const;
