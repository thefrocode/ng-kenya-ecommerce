import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { CartState } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';

const initialState: CartState = {
  products: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    no_of_items: computed(() => products().length),
    total_price: computed(() =>
      products().reduce(
        (acc: number, p: Product) => acc + parseFloat(p.price),
        0
      )
    ),
  })),
  withMethods((store) => ({
    addToCart(product: Product): void {
      patchState(store, (state) => ({
        products: [...state.products, product],
      }));
    },
    removeFromCart(product: Product): void {
      patchState(store, (state) => ({
        products: state.products.filter((p: Product) => p.id !== product.id),
      }));
    },
  }))
);
