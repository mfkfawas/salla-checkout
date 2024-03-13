import { newSpecPage } from '@stencil/core/testing';
import { AppHeader } from './app-header';

describe('app-header', () => {
  it('renders without errors', async () => {
    const page = await newSpecPage({
      components: [AppHeader],
      html: `<app-header></app-header>`,
    });

    expect(page.root).toBeDefined();
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('div')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('img')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('img').getAttribute('src')).toBe('test');
  });
});
