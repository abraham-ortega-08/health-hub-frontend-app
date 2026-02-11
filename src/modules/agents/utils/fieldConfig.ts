import { z } from 'zod';
import { BASIC_INFO_FIELDS, MODEL_CONFIG_FIELDS, PROMPT_CONFIG_FIELDS } from '../const';

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'dynamic-record' | 'markdown';

export interface FieldConfig {
	name: string;
	label: string;
	type: FieldType;
	validation?: z.ZodSchema;
	defaultValue?: any;
	placeholder?: string;
	options?: { value: string; label: string }[]; // For select
	min?: number; // For number
	max?: number;
	step?: number;
	rows?: number; // For textarea
	required?: boolean;
	description?: string;
}

// Re-export field configs from constants for backward compatibility
export { BASIC_INFO_FIELDS, MODEL_CONFIG_FIELDS, PROMPT_CONFIG_FIELDS };

// ====================================================================
// SECTION CONFIGURATIONS
// ====================================================================
export interface SectionConfig {
	id: string;
	title: string;
	fields: FieldConfig[];
	extractData: (agent: any) => Record<string, any>;
}

export const AGENT_SECTIONS: SectionConfig[] = [
	{
		id: 'basic_info',
		title: 'Basic Information',
		fields: BASIC_INFO_FIELDS,
		extractData: (agent) => ({
			name: agent.name,
			description: agent.description,
			model: agent.model,
			is_default: agent.is_default,
		}),
	},
	{
		id: 'model_config',
		title: 'Model Configuration',
		fields: MODEL_CONFIG_FIELDS,
		extractData: (agent) => agent.model_config,
	},
	{
		id: 'prompt_config',
		title: 'Prompt Configuration',
		fields: PROMPT_CONFIG_FIELDS,
		extractData: (agent) => agent.prompt_config,
	},
];
