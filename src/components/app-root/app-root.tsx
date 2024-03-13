import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="app-cart" exact={true} />
            <stencil-route url="/shipping" component="app-shipping" exact={true} />
            <stencil-route url="/confirmed" component="app-confirmed" exact={true} />
          </stencil-route-switch>
        </stencil-router>
      </main>
    );
  }
}
