import { RouterHistory } from '@stencil-community/router';
import { Component, Fragment, Prop, State, h } from '@stencil/core';
import { Shipping, getShipping, getTotals } from '../../services/mock-api-service';

export type ShippingMethods = 'dhl' | 'fedex' | 'aramex';

@Component({
  tag: 'app-shipping',
  styleUrl: 'app-shipping.css',
  shadow: true,
})
export class AppShipping {
  @State() isLoading = true;
  @State() shippingItems: Shipping[] = [];
  @State() selectedShippingMethod: ShippingMethods = 'dhl';
  @Prop() history: RouterHistory;

  totalCartPrice = 0;
  shippingFees = 0;
  isPromoTrue = false;

  async componentWillLoad() {
    const response = await getTotals({ isPromoTrue: this.history.location.state.isPromoTrue, shipping: this.selectedShippingMethod });
    const data = response.data.data;
    this.totalCartPrice = data.find(total => total.name === 'cart_total')?.amount - data.find(total => total.name === 'discount')?.amount;
    this.shippingFees = data.find(total => total.name === 'shipping_fees')?.amount;
    this.isLoading = false;
  }

  async componentDidRender() {
    if (this.shippingItems.length === 0) {
      const response = await getShipping();
      const data = response.data.data.map(item => ({
        id: Number(item.id),
        name: item.label,
        price: item.fees.amount,
        pic: item.logo,
      }));
      this.shippingItems = data;

      this.isLoading = false;
      this.isPromoTrue = this.history.location.state.isPromoTrue;
    }
  }

  changeShippingMethod = async (method: ShippingMethods) => {
    this.isLoading = true;
    const response = await getTotals({ isPromoTrue: this.isPromoTrue, shipping: method });
    const data = response.data.data;
    this.totalCartPrice = data.find(total => total.name === 'cart_total')?.amount - data.find(total => total.name === 'discount')?.amount;
    this.shippingFees = data.find(total => total.name === 'shipping_fees')?.amount;
    this.isLoading = false;
    this.selectedShippingMethod = method;
  };

  render() {
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'SAR',
    });
    const formattedCartPrice = formatter.format(Number(this.totalCartPrice));
    const formattedShippingPrice = formatter.format(this.shippingFees);
    const formattedTotals = formatter.format(Number(this.totalCartPrice) + this.shippingFees);

    const navigateWithState = () => {
      this.history.push('/confirmed');
    };

    return (
      <Fragment>
        {this.isLoading && <app-shimmer />}
        {!this.isLoading && (
          <app-layout>
            <app-header />
            <div class="flex flex-col gap-3 sm:gap-5">
              {/* head-section */}
              <div class="flex justify-between items-center gap-4">
                <div class="font-bold">
                  <span class="text-gray-400 cursor-pointer" onClick={() => this.history.goBack()}>
                    &lt;
                  </span>
                  &nbsp;&nbsp;Shipping
                </div>
                <hr class="flex-1 h-[3px] bg-basic rounded-full" />
              </div>

              {/* content-section */}
              <div class="flex flex-col gap-28">
                <ul>
                  {this.shippingItems.map(item => (
                    <Fragment>
                      <app-shipping-item
                        name={item.name}
                        price={item.price}
                        pic={item.pic}
                        onChangeShippingMethod={this.changeShippingMethod}
                        selectedShippingMethod={this.selectedShippingMethod}
                      />
                    </Fragment>
                  ))}
                </ul>

                <div class="flex flex-col gap-3">
                  <hr />
                  <div class="flex justify-between items-center gap-4">
                    <span class="font-bold text-sm">Cart Total</span>
                    <span class="font-bold text-sm">{formattedCartPrice}</span>
                  </div>

                  <div class="flex justify-between items-center gap-4">
                    <span class="font-bold text-sm">Shipping Fees</span>
                    <span class="font-bold text-sm">{formattedShippingPrice}</span>
                  </div>

                  <div class="flex justify-between items-center gap-4">
                    <span class="font-bold text-base">Totals</span>
                    <span class="font-bold text-sm">{formattedTotals}</span>
                  </div>

                  {/* Proceed Button */}
                  <button
                    disabled={!this.selectedShippingMethod}
                    onClick={() => navigateWithState()}
                    class={`${!this.selectedShippingMethod ? 'bg-gray-400 cursor-not-allowed' : 'bg-basic cursor-pointer'} m-0 text-white text-sm font-normal p-3 rounded-md`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </app-layout>
        )}
      </Fragment>
    );
  }
}
