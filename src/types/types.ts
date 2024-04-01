export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  photo: string;
  category: string;
  _id: string;
  price: number;
  stock: number;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

// a different way of writing.
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };
// {
//   productId: string;
//   photo: string;
//   name: string;
//   price: number;
//   quantity: number;
//   _id: string;
// };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  _id: string;
  user: {
    name: string;
    _id: string;
  };
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changeInPercentage: CountAndChange;
  count: CountAndChange;
  chart: {
    orderMonthlyCount: number[];
    orderMonthlyRevenue: number[];
  };
  usersGenderRatio: {
    male: number;
    female: number;
  };
  modifyLatestTransaction: LatestTransaction[];
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

export type Pie = {
  orderFulfillment: {
    processedOrders: number;
    shippedOrders: number;
    delieveredOrders: number;
  };
  productCategoriesRatio: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
  adminCustomer: {
    adminAccessUsers: number;
    userAccessUsers: number;
  };
};

export type Bar = {
  products: number[];
  users: number[];
  orders: number[];
};

export type Line = {
  productCount: number[];
  userCount: number[];
  discount: number[];
  revenue: number[];
};
