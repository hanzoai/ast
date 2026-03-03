export { AstClient } from './client.js';
export type {
  AstConfig,
  AstInteractionType,
  AstInteractionParams,
  AstBatchParams,
  AstInteractionResponse,
  AstFeedbackParams,
  AstFeedbackResponse,
} from './types.js';

// Convenience aliases matching hanzoai SDK naming
export type { AstInteractionType as AstleyInteractionType } from './types.js';
export type { AstInteractionParams as AstleyRecordInteractionParams } from './types.js';
export type { AstInteractionResponse as AstleyInteractionResponse } from './types.js';
export type { AstFeedbackParams as AstleyCollectFeedbackParams } from './types.js';
export type { AstFeedbackResponse as AstleyFeedbackResponse } from './types.js';
export type { AstBatchParams as AstleyRecordBatchParams } from './types.js';

// Alias class
export { AstClient as Ast } from './client.js';
export { AstClient as Astley } from './client.js';
