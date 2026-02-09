import { AgentDocument } from '../types';
import { Document } from '@/modules/knowledge/types';

/**
 * Adapt AgentDocument to Document format for knowledge components
 */
export const adaptAgentDocumentToDocument = (agentDoc: AgentDocument): Document => {
	return {
		id: agentDoc.id,
		name: agentDoc.name,
		type: agentDoc.type,
		user_id: agentDoc.user_id || '',
		session_id: agentDoc.session_id || '',
		created_at: agentDoc.created_at,
	};
};

/**
 * Adapt array of AgentDocuments to Documents
 */
export const adaptAgentDocuments = (agentDocs: AgentDocument[]): Document[] => {
	return agentDocs.map(adaptAgentDocumentToDocument);
};
