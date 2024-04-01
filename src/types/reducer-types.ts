import { CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subTotal: number;
  discount: number;
  total: number;
  shippingCharges: number;
  tax: number;
  shippingInfo: ShippingInfo;
}
