import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-layout',
  styleUrl: 'app-layout.css',
  shadow: true,
})
export class AppLayout {
  render() {
    return (
      <div class="bg-gray-200 flex justify-center items-center h-[100dvh]">
        <div class="bg-white w-[100%] h-[100%] sm:w-[35rem] sm:h-auto rounded-xl p-5 flex flex-col justify-center">
          <slot></slot>
        </div>
      </div>
    );
  }
}
