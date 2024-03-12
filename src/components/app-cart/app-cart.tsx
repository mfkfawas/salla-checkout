import { Component, Fragment, Host, State, h } from '@stencil/core';
import { ApiServiceResponse, Item, mockApiService } from '../../services/mock-api-service';

@Component({
  tag: 'app-cart',
  styleUrl: 'app-cart.css',
  shadow: true,
})
export class AppCart {
  @State() isLoading = true;
  @State() items: Item[] = [];

  async componentDidRender() {
    const data = (await mockApiService('/items')) as Item[];
    this.isLoading = false;
    this.items = data;
  }

  render() {
    const { isLoading, items } = this;
    const totalPrice = items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
    const formattedPrice = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'SAR',
    }).format(totalPrice);

    return (
      <Host>
        {isLoading && <app-shimmer />}
        {!isLoading && (
          <app-layout>
            <app-header />

            <div class="flex flex-col gap-3 sm:gap-5">
              {/* head-section */}
              <div class="flex justify-between items-center gap-4">
                <div class="font-bold">Cart</div>
                <hr class="flex-1 h-[3px] bg-basic rounded-full" />
              </div>

              {/* content-section */}
              <div class="bg-gray-50 rounded-lg border">
                {items.map((item, index) => (
                  <Fragment>
                    <app-cart-item count={item.count} pic={item.pic} name={item.name} price={item.price} />
                    {index + 1 !== items.length && <hr />}
                  </Fragment>
                ))}
              </div>

              {/* coupon section */}
              <div class="flex justify-between items-center gap-4">
                <span class="font-bold text-xs">Have a coupon?</span>
                <div class="bg-gray-50 border rounded-md flex items-center gap-2 p-1">
                  <input class="border-none ring-transparent h-4 w-20 bg-transparent placeholder-gray-400 promo-input text-xs font-normal" placeholder="insert code" />
                  <button class="bg-basic text-white text-xs px-2 py-1 rounded-md">Apply</button>
                </div>
              </div>

              {/* price section */}
              <div class="flex justify-between items-center gap-4">
                <span class="font-bold text-sm">Cart Total</span>
                <span class="font-bold text-sm">{formattedPrice}</span>
              </div>

              {/* Proceed Button */}
              <button class="bg-basic text-white text-sm font-normal p-3 rounded-md">Proceed to shipping</button>
            </div>
          </app-layout>
        )}
      </Host>
    );
  }
}
