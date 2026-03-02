/**
 * @hanzo/ast browser entry point.
 *
 * Ultra-light browser shim — no bundler required.
 * Usage via script tag:
 *   <script type="module" src="https://cdn.hanzo.ai/ast/1.0.0/ast.min.js"
 *           data-api-key="..." data-dataset-id="..."></script>
 */
export { AstClient } from './client.js';
export type {
  AstConfig,
  AstInteractionType,
  AstInteractionParams,
  AstFeedbackParams,
} from './types.js';

// Auto-initialize from <script data-api-key="..." ...> when loaded as a module
if (typeof document !== 'undefined') {
  const script =
    document.currentScript ||
    document.querySelector('script[data-api-key][src*="@hanzo/ast"]');

  if (script) {
    const attr = (name: string) => (script as HTMLElement).getAttribute(`data-${name}`) ?? '';
    const apiKey = attr('api-key');
    if (apiKey) {
      const { AstClient } = await import('./client.js');
      const ast = new AstClient({
        apiKey,
        baseUrl: attr('base-url') || undefined,
        datasetId: attr('dataset-id') || undefined,
        organizationId: attr('org-id') || undefined,
      });
      // Expose globally
      (window as typeof window & { hanzo: { ast?: typeof ast } }).hanzo ??= {} as typeof window.hanzo;
      (window as typeof window & { hanzo: { ast?: typeof ast } }).hanzo.ast = ast;
    }
  }
}
