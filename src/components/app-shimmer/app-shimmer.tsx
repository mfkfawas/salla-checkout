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

        {/* Shimmer blur */}
        <div class="flex flex-col gap-3 sm:gap-5">
          {/* head-section */}
          <div class="flex justify-between items-center gap-4">
            <div class="h-4 w-20 shimmer-effect rounded-lg"></div>
            <hr class="flex-1 shimmer-effect h-[2px] rounded-full" />
          </div>

          {/* content-section */}
          <div class="shimmer-effect h-64 rounded-lg"></div>

          {/* coupon section */}
          <div class="flex justify-center sm:justify-between items-center gap-4">
            <div class="h-4 w-full sm:w-60 shimmer-effect rounded-lg"></div>
            <div class="h-4 hidden sm:block sm:w-20 shimmer-effect rounded-lg"></div>
          </div>

          {/* price section */}
          <div class="flex justify-center sm:justify-between items-center gap-4">
            <div class="h-4 w-full sm:w-60 shimmer-effect rounded-lg"></div>
            <div class="h-4 hidden sm:block sm:w-20 shimmer-effect rounded-lg"></div>
          </div>

          {/* button section */}
          <div class="shimmer-effect h-11 rounded-lg"></div>
        </div>
      </app-layout>
    );
  }
}
