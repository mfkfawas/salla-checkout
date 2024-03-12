import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <app-layout>
        <app-header />

        <div class="bg-indigo-600 p-6 rounded-md flex justify-center">
          <p class="text-white">This is a Stencil component using Tailwind</p>
        </div>

        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}
      </app-layout>
    );
  }
}
