import { SSEEvent, ProgressInfo, DocumentMetadata, UploadedFile } from '../types';

export interface StreamCallbacks {
	onStreamStart?: (streamId: string) => void;
	onProgress?: (progress: ProgressInfo) => void;
	onMetadata?: (documents?: DocumentMetadata[], uploadedFiles?: UploadedFile[]) => void;
	onChunk?: (content: string) => void;
	onComplete?: () => void;
	onCancelled?: () => void;
	onError?: (error: string) => void;
}

export interface StreamConfig {
	autoReconnect?: boolean;
	maxReconnectAttempts?: number;
	reconnectDelay?: number;
}

const DEFAULT_CONFIG: Required<StreamConfig> = {
	autoReconnect: true,
	maxReconnectAttempts: 3,
	reconnectDelay: 2000,
};

/**
 * Servicio optimizado para manejar streaming SSE con chat AI
 * Features:
 * - Reconexión automática
 * - Cancelación de streams
 * - Gestión de múltiples streams concurrentes
 * - Buffer optimizado para SSE
 */
export class StreamingService {
	private activeStreams = new Map<string, AbortController>();
	private reconnectAttempts = 0;
	private streamId: string | null = null;

	/**
	 * Inicia un stream SSE
	 */
	async startStream(
		formData: FormData,
		callbacks: StreamCallbacks,
		config: StreamConfig = {}
	): Promise<void> {
		const mergedConfig = { ...DEFAULT_CONFIG, ...config };
		
		try {
			await this.executeStream(formData, callbacks, mergedConfig);
		} catch (error) {
			if (this.shouldReconnect(error, mergedConfig)) {
				await this.attemptReconnect(formData, callbacks, mergedConfig);
			} else {
				if (callbacks.onError) {
					callbacks.onError(this.getErrorMessage(error));
				}
			}
		}
	}

	/**
	 * Ejecuta el stream principal
	 */
	private async executeStream(
		formData: FormData,
		callbacks: StreamCallbacks,
		config: Required<StreamConfig>
	): Promise<void> {
		const abortController = new AbortController();
		
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
		const response = await fetch(`${baseUrl}/chat/query-stream`, {
			method: 'POST',
			body: formData,
			signal: abortController.signal,
			headers: {
				'Accept': 'text/event-stream',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Obtener streamId del header
		const streamIdFromHeader = response.headers.get('X-Stream-Id');
		if (streamIdFromHeader) {
			this.streamId = streamIdFromHeader;
			this.activeStreams.set(streamIdFromHeader, abortController);
		}

		// Reset reconnect attempts on successful connection
		this.reconnectAttempts = 0;

		await this.processStream(response, callbacks);
	}

	/**
	 * Procesa el stream SSE línea por línea
	 */
	private async processStream(response: Response, callbacks: StreamCallbacks): Promise<void> {
		const reader = response.body?.getReader();
		if (!reader) {
			throw new Error('Response body is not readable');
		}

		const decoder = new TextDecoder();
		let buffer = '';

		try {
			while (true) {
				const { done, value } = await reader.read();
				
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				
				// Procesar líneas completas SSE
				const lines = buffer.split('\n');
				buffer = lines.pop() || ''; // Mantener línea incompleta en buffer

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						try {
							const data = JSON.parse(line.substring(6)) as SSEEvent;
							this.handleEvent(data, callbacks);
						} catch (e) {
							console.error('Error parsing SSE data:', e);
						}
					}
				}
			}
		} finally {
			reader.releaseLock();
		}
	}

	/**
	 * Maneja eventos SSE según su tipo
	 */
	private handleEvent(event: SSEEvent, callbacks: StreamCallbacks): void {
		switch (event.type) {
			case 'stream_started':
				this.streamId = event.streamId;
				if (callbacks.onStreamStart) {
					callbacks.onStreamStart(event.streamId);
				}
				break;
			
			case 'progress':
				if (callbacks.onProgress) {
					callbacks.onProgress(event.progress);
				}
				break;
			
			case 'metadata':
				if (callbacks.onMetadata) {
					callbacks.onMetadata(event.documents, event.uploadedFiles);
				}
				break;
			
			case 'chunk':
				if (callbacks.onChunk) {
					callbacks.onChunk(event.content);
				}
				break;
			
			case 'complete':
				this.cleanup();
				if (callbacks.onComplete) {
					callbacks.onComplete();
				}
				break;
			
			case 'cancelled':
				this.cleanup();
				if (callbacks.onCancelled) {
					callbacks.onCancelled();
				}
				break;
			
			case 'error':
				this.cleanup();
				if (callbacks.onError) {
					callbacks.onError(event.error);
				}
				break;
		}
	}

	/**
	 * Determina si debe reconectar basado en el error
	 */
	private shouldReconnect(error: any, config: Required<StreamConfig>): boolean {
		if (!config.autoReconnect) return false;
		if (this.reconnectAttempts >= config.maxReconnectAttempts) return false;
		
		// No reconectar si fue cancelado intencionalmente
		if (error?.name === 'AbortError') return false;
		
		return true;
	}

	/**
	 * Intenta reconectar con delay exponencial
	 */
	private async attemptReconnect(
		formData: FormData,
		callbacks: StreamCallbacks,
		config: Required<StreamConfig>
	): Promise<void> {
		this.reconnectAttempts++;
		
		console.log(`Attempting reconnection ${this.reconnectAttempts}/${config.maxReconnectAttempts}`);
		
		// Delay con backoff exponencial
		const delay = config.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);
		await new Promise(resolve => setTimeout(resolve, delay));
		
		try {
			await this.executeStream(formData, callbacks, config);
		} catch (error) {
			if (this.shouldReconnect(error, config)) {
				await this.attemptReconnect(formData, callbacks, config);
			} else {
				if (callbacks.onError) {
					callbacks.onError(this.getErrorMessage(error));
				}
			}
		}
	}

	/**
	 * Cancela un stream activo
	 */
	async cancelStream(streamId?: string): Promise<boolean> {
		const id = streamId || this.streamId;
		if (!id) return false;

		// Abortar la conexión local
		const abortController = this.activeStreams.get(id);
		if (abortController) {
			abortController.abort();
			this.activeStreams.delete(id);
		}

		// Notificar al servidor
		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
			const response = await fetch(`${baseUrl}/chat/cancel-stream/${id}`, {
				method: 'POST',
			});
			
			if (!response.ok) {
				console.warn('Failed to cancel stream on server');
				return false;
			}
			
			const result = await response.json();
			return result.success;
		} catch (error) {
			console.error('Error cancelling stream:', error);
			return false;
		} finally {
			this.cleanup();
		}
	}

	/**
	 * Limpia el estado del stream
	 */
	private cleanup(): void {
		if (this.streamId) {
			this.activeStreams.delete(this.streamId);
			this.streamId = null;
		}
		this.reconnectAttempts = 0;
	}

	/**
	 * Obtiene mensaje de error legible
	 */
	private getErrorMessage(error: any): string {
		if (error?.name === 'AbortError') {
			return 'Stream was cancelled';
		}
		return error?.message || 'An error occurred during streaming';
	}

	/**
	 * Obtiene el ID del stream activo
	 */
	getActiveStreamId(): string | null {
		return this.streamId;
	}

	/**
	 * Verifica si hay un stream activo
	 */
	hasActiveStream(): boolean {
		return this.streamId !== null;
	}

	/**
	 * Obtiene el número de streams activos
	 */
	getActiveStreamsCount(): number {
		return this.activeStreams.size;
	}

	/**
	 * Cancela todos los streams activos
	 */
	async cancelAllStreams(): Promise<void> {
		const streamIds = Array.from(this.activeStreams.keys());
		await Promise.all(streamIds.map(id => this.cancelStream(id)));
	}
}

// Singleton instance
export const streamingService = new StreamingService();
