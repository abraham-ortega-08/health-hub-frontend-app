export interface Document {
  id: number;
  name: string;
  type: 'FIXED' | 'DYNAMIC';
  user_id: string;
  session_id: string;
  created_at: string;
  original_content?: string;
}

export interface DocumentsResponse {
  items: Document[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface DocumentsQueryParams {
  type?: 'FIXED' | 'DYNAMIC';
  page?: number;
  limit?: number;
  excludeFields?: string;
}

export interface UploadDocumentsPayload {
  files: File[];
  type: 'FIXED' | 'DYNAMIC';
  userId?: string;
  sessionId?: string;
}

export interface UploadDocumentsResponse {
  success: boolean;
  documents: Document[];
  message?: string;
}
