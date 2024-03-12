import bosePic from '../assets/items/bose-headphones.svg';
import baseusPic from '../assets/items/basues-headphones.svg';
import applePic from '../assets/items/apple-headphones.svg';
import dhlLogo from '../assets/items/dhl-logo.svg';
import fedexLogo from '../assets/items/fedex-logo.svg';
import aramexLogo from '../assets/items/aramex-logo.svg';

export interface Item {
  id: number;
  name: string;
  price: number;
  pic: string;
  count: number;
}

interface Shipping {
  id: number;
  name: string;
  price: string;
  pic: string;
}

interface CouponResponse {
  status: 'success' | 'failure';
  statusMessage: string;
}

export type ApiServiceResponse = Item[] | Shipping[] | CouponResponse;

const items = [
  { id: 1, name: 'Bose QuietComfort 45 wireless bluetooth headphones', price: 1500, pic: bosePic, count: 1 },
  { id: 2, name: 'Baseus Active Noise Cancelling Headphones', price: 750, pic: baseusPic, count: 1 },
  { id: 3, name: 'Apple AirPods Max - Sky Blue', price: 1650, pic: applePic, count: 1 },
];

const shipping = [
  { id: 1, name: 'DHL', price: 'Free', pic: dhlLogo },
  { id: 2, name: 'FedEx', price: '15', pic: fedexLogo },
  { id: 3, name: 'ARAMEX', price: '25', pic: aramexLogo },
];

export async function mockApiService(endpoint: string, coupon?: string): Promise<ApiServiceResponse> {
  if (endpoint === '/items')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(items);
      }, 1000);
    });

  if (endpoint === '/shipping')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(shipping);
      }, 1000);
    });

  if (endpoint === '/submit')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ status: 'success', statusMessage: 'Order submitted successfully' });
      }, 1000);
    });

  if (endpoint === '/coupon' && coupon.toLocaleLowerCase() === 'freemusic')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ status: 'success', statusMessage: 'Coupon exists!' });
      }, 1000);
    });

  if (endpoint === '/coupon' && coupon.toLocaleLowerCase() !== 'freemusic')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ status: 'failure', statusMessage: 'Coupon not exists!' });
      }, 1000);
    });
}
