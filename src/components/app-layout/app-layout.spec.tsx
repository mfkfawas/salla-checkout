import { newSpecPage } from '@stencil/core/testing';
import { AppLayout } from './app-layout';

describe('app-layout', () => {
  it('renders correctly', async () => {
    const page = await newSpecPage({
      components: [AppLayout],
      html: `<app-layout></app-layout>`,
    });

    expect(page.root).toEqualHtml(`
      <app-layout>
        <mock:shadow-root>
          <div class="bg-gray-200 flex justify-center items-center h-[100dvh]">
            <div class="bg-white w-[100%] h-[100%] sm:w-[35rem] sm:h-auto rounded-xl p-5 flex flex-col justify-center">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </app-layout>
    `);
  });
});
