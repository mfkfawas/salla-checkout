import { Component, h } from '@stencil/core';
import headerLogo from '../../assets/items/headerLogo.svg';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {
  render() {
    return (
      <div class="pb-4">
        <img class="h-10 w-44 logo" src={headerLogo} alt="" />
      </div>
    );
  }
}
