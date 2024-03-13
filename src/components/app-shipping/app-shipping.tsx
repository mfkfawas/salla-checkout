import { RouterHistory } from '@stencil-community/router';
import { Component, Fragment, Prop, State, h } from '@stencil/core';
import { Shipping, mockApiService } from '../../services/mock-api-service';

export type ShippingMethods = 'DHL' | 'FedEx' | 'ARAMEX';

@Component({
  tag: 'app-shipping',
  styleUrl: 'app-shipping.css',
  shadow: true,
})
export class AppShipping {
  @State() isLoading = true;
  @State() shippingItems: Shipping[] = [];
  @State() selectedShippingMethod: ShippingMethods = 'DHL';
  @Prop() history: RouterHistory;

  statePassed = '';

  async componentDidRender() {
    const data = (await mockApiService('/shipping')) as Shipping[];
    this.shippingItems = data;
    this.isLoading = false;
    this.statePassed = this.history.location.state.totalCartValue;

    if (!Number(this.statePassed)) this.history.push('/');
  }

  changeShippingMethod = (method: ShippingMethods) => {
    this.selectedShippingMethod = method;
  };

  render() {
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'SAR',
    });
    const formattedCartPrice = formatter.format(Number(this.statePassed));

    let shippingFees = 0;
    if (this.selectedShippingMethod === 'FedEx') shippingFees = 15;
    if (this.selectedShippingMethod === 'ARAMEX') shippingFees = 25;
    const formattedShippingPrice = formatter.format(shippingFees);

    const formattedTotals = formatter.format(Number(this.statePassed) + shippingFees);

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
                  <button onClick={() => navigateWithState()} class="bg-basic m-0 text-white text-sm font-normal p-3 rounded-md">
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
