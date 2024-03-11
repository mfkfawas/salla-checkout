import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <div class="bg-indigo-600 p-6 rounded-md flex justify-center">
          <h1 class="text-white font-sans">This is a Stencil component using Tailwind</h1>
        </div>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
