export interface Narudzbe {
  uid?: string;
  phone: string;
  fullName?: string;
  datum?:string;
  orderAddress?: string;
  orderTotal?: number;
  status?: boolean;
  orderCode?: string;
  orderJelo?: string;
  orderKomentar?: string;
  orderDoplata?: number;
  // address?: string,
}

export interface Users {
  uid?: string;
  phone: string;
  fullName?: string;
}
export interface Order {
  uid?: string;
  orderAddress?: string;
  orderTotal?: number;
  status?: boolean;
  orderCode?: string;
  orderJelo?: string;
  orderKomentar?: string;
  orderDoplata?: number;
  datum?:string;
}
