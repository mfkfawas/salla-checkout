import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-shimmer',
  styleUrl: 'app-shimmer.css',
  shadow: true,
})
export class AppShimmer {
  render() {
    return (
      <app-layout>
        <app-header />
      </app-layout>
    );
  }
}
