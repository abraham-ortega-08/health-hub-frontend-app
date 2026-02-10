import { z } from 'zod';
import { FieldConfig } from '../components/detail/forms/fieldConfig';
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
 * Prompt Config Field (Dynamic Key-Value)
 */
export const PROMPT_CONFIG_FIELD: FieldConfig = {
	name: 'prompt_config',
	label: 'Prompt Configuration',
	type: 'dynamic-record',
	defaultValue: {},
	description: FIELD_DESCRIPTIONS.PROMPT_CONFIG,
	validation: z
		.record(
			z.string().min(1, 'Key name is required'),
			z.union([z.string().min(1, 'Value is required'), z.record(z.string())]),
		)
		.refine((obj) => Object.keys(obj).length > 0, {
			message: 'At least one configuration key is required',
		}),
} as const;
