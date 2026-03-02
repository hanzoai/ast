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

/** Convenience factory. */
export function createAst(config: import('./types.js').AstConfig) {
  const { AstClient } = require('./client.js');
  return new AstClient(config);
}
