export type AstInteractionType =
  | 'page_view'
  | 'click'
  | 'form_submit'
  | 'search'
  | 'purchase'
  | 'chat_message'
  | 'model_output'
  | 'tool_use'
  | 'error'
  | 'custom';

export interface AstInteractionParams {
  sessionId: string;
  type: AstInteractionType;
  data: Record<string, unknown>;
  organizationId?: string;
  userId?: string;
  datasetId?: string;
  timestamp?: string;
  context?: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
    previousPage?: string;
    locale?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface AstBatchParams {
  events: Array<AstInteractionParams>;
}

export interface AstInteractionResponse {
  id: string;
  sessionId: string;
  type: AstInteractionType;
  data: Record<string, unknown>;
  organizationId?: string;
  userId?: string;
  datasetId?: string;
  timestamp: string;
  createdAt: string;
}

export interface AstFeedbackParams {
  modelOutputId: string;
  feedback: 'positive' | 'negative' | 'neutral';
  rating?: number;
  explanation?: string;
  expectedOutput?: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface AstFeedbackResponse {
  id: string;
  modelOutputId: string;
  feedback: 'positive' | 'negative' | 'neutral';
  rating?: number;
  recordedAt: string;
}

export interface AstConfig {
  /** Hanzo API key */
  apiKey: string;
  /** API base URL — defaults to https://api.hanzo.ai */
  baseUrl?: string;
  /** Dataset to record into */
  datasetId?: string;
  /** Organization ID */
  organizationId?: string;
  /** Flush interval in ms — defaults to 2000 */
  flushInterval?: number;
  /** Max batch size before forced flush — defaults to 50 */
  maxBatchSize?: number;
}
