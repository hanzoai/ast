import { AstClient } from './client.js';

export { AstClient } from './client.js';
export type {
  AstConfig,
  AstInteractionType,
  AstInteractionParams,
  AstFeedbackParams,
} from './types.js';

// Auto-initialize from <script data-api-key="..." ...>
if (typeof document !== 'undefined') {
  const script =
    document.currentScript ||
    document.querySelector('script[data-api-key][src*="@hanzo/ast"]');

  if (script) {
    const attr = (name: string) => (script as HTMLElement).getAttribute(`data-${name}`) ?? '';
    const apiKey = attr('api-key');
    if (apiKey) {
      const ast = new AstClient({
        apiKey,
        baseUrl: attr('base-url') || undefined,
        datasetId: attr('dataset-id') || undefined,
        organizationId: attr('org-id') || undefined,
      });
      ((window as any).hanzo ??= {}).ast = ast;
    }
  }
}
