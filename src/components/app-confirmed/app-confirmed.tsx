import { Component, Prop, h } from '@stencil/core';
import logo from '../../assets/items/confirmed-logo.svg';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'app-confirmed',
  styleUrl: 'app-confirmed.css',
  shadow: true,
})
export class AppConfirmed {
  @Prop() history: RouterHistory;

  render() {
    return (
      <app-layout>
        <div class="flex items-center justify-center sm:py-28">
          <div class="flex flex-col items-center gap-2 text-center">
            <img src={logo} alt="logo" />
            <span class="font-black text-2xl sm:text-4xl">Payment Confirmed</span>
            <span class="font-normal text-gray-400 text-lg">Thank you for shopping</span>
            <span class="font-normal text-gray-400 text-xs underline cursor-pointer" onClick={() => this.history.push('/')}>
              return to store
            </span>
          </div>
        </div>
      </app-layout>
    );
  }
}
