import axios from 'axios';

export const publicAxiosInstance = axios.create({
  baseURL: 'https://checkout.free.beeceptor.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface Item {
  id: number;
  name: string;
  price: number;
  pic: string;
  count: number;
}

export interface Shipping {
  id: number;
  name: string;
  price: number;
  pic: string;
}

export type ApiServiceResponse = Item[] | Shipping[];

// ------------getItems API START---------------------------------------------------------
type GetItemsResponseInterface = {
  status: number;
  success: boolean;
  data: {
    id: string;
    label: string;
    thumbnail: string;
    qty: number;
    price: {
      currency: string;
      amount: number;
    };
  }[];
};

type GetItemsType = () => Promise<{ data: GetItemsResponseInterface }>;

export const getItems: GetItemsType = () => publicAxiosInstance.get('/items');
// ------------getItems API END---------------------------------------------------------

// ------------getCoupons API START---------------------------------------------------------
type GetCouponsResponseInterface = {
  status: number;
  success: boolean;
  data: {
    id: string;
    name: string;
    label: string;
    discount: {
      type: string;
      amount: string;
    };
  }[];
};

type GetCouponsType = () => Promise<{ data: GetCouponsResponseInterface }>;

export const getCoupons: GetCouponsType = () => publicAxiosInstance.get('/coupons');
// ------------getCoupons API END---------------------------------------------------------

// ------------getShipping API START---------------------------------------------------------
type GetShippingResponseInterface = {
  status: number;
  success: boolean;
  data: {
    id: string;
    name: string;
    label: string;
    logo: string;
    fees: {
      currency: string;
      amount: number;
    };
  }[];
};

type GetShippingType = () => Promise<{ data: GetShippingResponseInterface }>;

export const getShipping: GetShippingType = () => publicAxiosInstance.get('/shipping');
// ------------getShipping API END---------------------------------------------------------

// ------------getTotals API START---------------------------------------------------------
type GetTotalsRequestInterface = {
  isPromoTrue: boolean;
  shipping?: 'dhl' | 'fedex' | 'aramex';
};

type GetTotalsResponseInterface = {
  status: number;
  success: boolean;
  data: {
    name: string;
    label: string;
    currency: string;
    amount: number;
  }[];
};

type GetTotalsType = (data: GetTotalsRequestInterface) => Promise<{ data: GetTotalsResponseInterface }>;

export const getTotals: GetTotalsType = ({ isPromoTrue, shipping = 'dhl' }) => publicAxiosInstance.get(`/totals?coupon=${isPromoTrue}&shipping=${shipping}`);
// ------------getShipping API END---------------------------------------------------------
