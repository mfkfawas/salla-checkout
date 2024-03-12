import { Component, Prop, h } from '@stencil/core';

interface CartItemProps {
  count: number;
  pic: string;
  name: string;
  price: number;
}

@Component({
  tag: 'app-cart-item',
  styleUrl: 'app-cart-item.css',
  shadow: true,
})
export class AppCartItem {
  @Prop() count: CartItemProps['count'];
  @Prop() pic: CartItemProps['pic'];
  @Prop() name: CartItemProps['name'];
  @Prop() price: CartItemProps['price'];

  render() {
    const { pic, price, name, count } = this;
    const formattedPrice = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'SAR',
    }).format(price);

    return (
      <div class="p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <div class="flex gap-2 items-center">
          <img src={pic} alt="item" />
          <div class="flex flex-col gap-1">
            <p class="font-normal text-xs leading-4 underline w-48">{name}</p>
            <p class="font-normal text-[10px] text-gray-400">{formattedPrice}</p>
          </div>
        </div>

        <div class="flex justify-around sm:justify-between flex-1">
          <span class="font-bold text-xs">{count}</span>
          <span class="font-bold text-xs">{formattedPrice}</span>
        </div>
      </div>
    );
  }
}
