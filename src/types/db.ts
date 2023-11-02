export interface User {
  id: number;
  email: string;
  username: string;
  image?: string | undefined;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  attributes: {
    title: string;
    price: string;
    company: string;
    description: string;
    category: string;
    colors: string[];
    image: string;
    featured: boolean;
    shipping: boolean;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  amount: number;
  company: string;
  color: string;
}

export interface Order {
  id: number;
  attributes: {
    name: string;
    address: string;
    cartItems: CartItem[];
    numItemsInCart: number;
    orderTotal: string;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

export type MetaData = {
  categories: string[];
  companies: string[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
