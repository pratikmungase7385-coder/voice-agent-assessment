export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderState {
  items: OrderItem[];
  total: number;
}

export const orderState: OrderState = {
  items: [],
  total: 0
};