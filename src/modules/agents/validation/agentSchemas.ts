import { z } from 'zod';

// Model Configuration Schema
export const modelConfigSchema = z.object({
	temperature: z.number().min(0).max(2),
	max_tokens: z.number().int().positive(),
	max_current_chunks: z.number().int().positive(),
	max_history_messages: z.number().int().positive(),
	max_historical_chunks: z.number().int().positive(),
});

// Prompt Configuration Schema (Fixed: system_prompt and no_context_prompt)
export const promptConfigSchema = z.object({
	system_prompt: z.string().min(1, 'System prompt is required'),
	no_context_prompt: z.string().min(1, 'No context prompt is required'),
});

// Basic Information Schema
export const basicInfoSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	model: z.string().min(1, 'Model is required'),
	is_default: z.boolean(),
});

// Full Agent Schema (for complete validation if needed)
export const agentSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	model: z.string().min(1, 'Model is required'),
	is_default: z.boolean(),
	is_active: z.boolean(),
	prompt_config: promptConfigSchema,
	model_config: modelConfigSchema,
	created_at: z.string(),
	updated_at: z.string(),
	created_by: z.string(),
	document_count: z.number(),
});

// Type inference from Zod schemas
export type ModelConfig = z.infer<typeof modelConfigSchema>;
export type PromptConfig = z.infer<typeof promptConfigSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type AgentSchema = z.infer<typeof agentSchema>;

// Partial schemas for PATCH operations
export const partialModelConfigSchema = modelConfigSchema.partial();
export const partialPromptConfigSchema = promptConfigSchema;
export const partialBasicInfoSchema = basicInfoSchema.partial();
