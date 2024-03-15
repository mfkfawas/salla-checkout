import { Component, Fragment, Host, Prop, State, h } from '@stencil/core';
import { Item, getItems, getCoupons } from '../../services/mock-api-service';
import promoIcon from '../../assets/items/promo-icon.svg';
import { RouterHistory } from '@stencil-community/router';

@Component({
  tag: 'app-cart',
  styleUrl: 'app-cart.css',
  shadow: true,
})
export class AppCart {
  @State() isLoading = true;
  @State() isPromoTrue = false;
  @State() value: string = '';
  @State() items: Item[] = [];

  @Prop() history: RouterHistory;

  discountPercent = 0;

  async componentDidRender() {
    if (this.items.length === 0) {
      const response = await getItems();
      const data = response.data.data.map(item => ({
        id: Number(item.id),
        name: item.label,
        price: item.price.amount,
        pic: item.thumbnail,
        count: item.qty,
      }));
      this.items = data;
      this.isLoading = false;
    }
  }

  handlePromoApply = async () => {
    this.isLoading = true;
    const response = await getCoupons();
    const { data } = response.data;
    const promoCodeFromAPI = data.at(0).name;
    this.discountPercent = Number(data.at(0).discount.amount);

    if (this.value.trim().toLowerCase() === promoCodeFromAPI.toLowerCase()) this.isPromoTrue = true;
    else this.isPromoTrue = false;

    this.value = '';
    this.isLoading = false;
  };

  handlePromoDelete = async () => {
    this.isPromoTrue = false;
  };

  render() {
    const { isLoading, items, isPromoTrue, discountPercent } = this;

    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'SAR',
    });
    const totalPrice = items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
    const promoValue = totalPrice * (discountPercent / 100);
    const totalPriceWithPromo = !isPromoTrue ? totalPrice : totalPrice - promoValue;
    const formattedPromoValue = formatter.format(promoValue);
    const formattedPrice = formatter.format(totalPriceWithPromo);

    const navigateWithState = () => {
      this.history.push('/shipping', { isPromoTrue });
    };

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
                {!isPromoTrue && (
                  <Fragment>
                    <span class="font-bold text-xs">Have a coupon?</span>
                    <div class="bg-gray-50 border rounded-md flex items-center gap-2 p-1">
                      <input
                        value={this.value}
                        onInput={e => {
                          const target = e.target as HTMLInputElement;
                          this.value = target.value;
                        }}
                        class="border-none ring-transparent h-4 w-20 bg-transparent placeholder-gray-400 promo-input text-xs font-normal"
                        placeholder="insert code"
                      />
                      <button onClick={this.handlePromoApply} class="bg-basic text-white text-xs px-2 py-1 rounded-md">
                        Apply
                      </button>
                    </div>
                  </Fragment>
                )}
                {isPromoTrue && (
                  <Fragment>
                    <img src={promoIcon} alt="prmo-delete" class="logo" onClick={this.handlePromoDelete} />
                    <span class="font-bold text-xs text-red-500">- {formattedPromoValue}</span>
                  </Fragment>
                )}
              </div>

              {/* price section */}
              <div class="flex justify-between items-center gap-4">
                <span class="font-bold text-sm">Cart Total</span>
                <span class="font-bold text-sm">{formattedPrice}</span>
              </div>

              {/* Proceed Button */}
              <button onClick={() => navigateWithState()} class="bg-basic text-white text-sm font-normal p-3 rounded-md">
                Proceed to shipping
              </button>
            </div>
          </app-layout>
        )}
      </Host>
    );
  }
}
