export interface Product {
  id: number;
  name: string;
  price: string;
  short_description: string;
  inCart?: boolean;
}

export interface ProductsState {
  products: Product[];
  options: { page: number; limit: number; filter: string };
  status: 'pending' | 'loading' | 'success' | 'error';
  error: string;
}
