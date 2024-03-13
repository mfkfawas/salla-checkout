import { Component, Prop, h } from '@stencil/core';
import { ShippingMethods } from '../app-shipping/app-shipping';

interface ShippingItemProps {
  name: ShippingMethods;
  price: string;
  pic: string;
  selectedShippingMethod: ShippingMethods;
  onChangeShippingMethod: (string: ShippingMethods) => void;
}

@Component({
  tag: 'app-shipping-item',
  styleUrl: 'app-shipping-item.css',
  shadow: true,
})
export class AppShippingItem {
  @Prop() pic: ShippingItemProps['pic'];
  @Prop() name: ShippingItemProps['name'];
  @Prop() price: ShippingItemProps['price'];
  @Prop() selectedShippingMethod: ShippingItemProps['selectedShippingMethod'];
  @Prop() onChangeShippingMethod: ShippingItemProps['onChangeShippingMethod'];

  render() {
    const { pic, price, name } = this;
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'SAR',
    });

    let formattedPrice: string;
    if (price !== 'Free') {
      formattedPrice = formatter.format(Number(price));
    }
    const checked = this.selectedShippingMethod === name;

    return (
      <li class="flex justify-between py-3">
        <div class="flex gap-3">
          {/* <input class="" checked={this.selectedShippingMethod === name} onInput={() => this.onChangeShippingMethod(name)} type="radio" /> */}
          <div>
            <input type="radio" id="radioExample" name="radio" class="hidden" checked={checked} onInput={() => this.onChangeShippingMethod(name)} />
            <label htmlFor="radioExample" class="inline-flex justify-center items-center cursor-pointer">
              <span class={`w-4 h-4 inline-block mr-2 rounded-full border border-gray-300 ${checked ? 'bg-basic' : 'bg-white'}`}></span>
            </label>
          </div>
          <img src={pic} alt="logo" />
          <span class="font-normal text-xs">{name}</span>
        </div>

        <span class="font-bold text-xs">{!formattedPrice ? price : `SAR + ${formattedPrice}`}</span>
      </li>
    );
  }
}
