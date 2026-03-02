import type {
  AstConfig,
  AstInteractionParams,
  AstInteractionResponse,
  AstBatchParams,
  AstFeedbackParams,
  AstFeedbackResponse,
} from './types.js';

export class AstClient {
  private config: Required<AstConfig>;
  private queue: AstInteractionParams[] = [];
  private flushTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(config: AstConfig) {
    this.config = {
      baseUrl: 'https://api.hanzo.ai',
      datasetId: '',
      organizationId: '',
      flushInterval: 2000,
      maxBatchSize: 50,
      ...config,
    };
  }

  /** Record a single interaction (queued, auto-batched). */
  record(params: Omit<AstInteractionParams, 'sessionId'> & { sessionId?: string }): void {
    const event: AstInteractionParams = {
      sessionId: params.sessionId ?? this.getSessionId(),
      datasetId: params.datasetId ?? this.config.datasetId,
      organizationId: params.organizationId ?? this.config.organizationId,
      timestamp: params.timestamp ?? new Date().toISOString(),
      ...params,
    };
    this.queue.push(event);

    if (this.queue.length >= this.config.maxBatchSize) {
      this.flush();
    } else if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => this.flush(), this.config.flushInterval);
    }
  }

  /** Record a chat/LLM interaction. */
  chat(data: Record<string, unknown>, meta?: Partial<AstInteractionParams>): void {
    this.record({ type: 'chat_message', data, ...meta });
  }

  /** Record a model output for quality/feedback tracking. */
  modelOutput(data: Record<string, unknown>, meta?: Partial<AstInteractionParams>): void {
    this.record({ type: 'model_output', data, ...meta });
  }

  /** Record user feedback on a model output. */
  async feedback(params: AstFeedbackParams): Promise<AstFeedbackResponse> {
    return this.post<AstFeedbackResponse>('/v1/ast/feedback', params);
  }

  /** Flush buffered events immediately. */
  async flush(): Promise<void> {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    const events = this.queue.splice(0, this.queue.length);
    if (events.length === 0) return;

    try {
      await this.post<{ count: number }>('/v1/ast/batch', { events });
    } catch {
      // Re-queue on failure (best-effort)
      this.queue.unshift(...events);
    }
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`AST API error: ${res.status}`);
    return res.json() as Promise<T>;
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return crypto.randomUUID();
    const key = '__hanzo_ast_sid';
    let sid = sessionStorage?.getItem(key);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage?.setItem(key, sid);
    }
    return sid;
  }
}
