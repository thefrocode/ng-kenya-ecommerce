import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { pipe, tap, switchMap, filter, debounceTime } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductsState } from '../../shared/models/product';
import { ProductsApiService } from '../../shared/services/products-api.service';
import { CartStore } from '../../shopping-cart/data-access/cart.store';

const initialState: ProductsState = {
  products: [],
  options: { page: 1, limit: 3, filter: '' },
  status: 'pending',
  error: '',
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }, cartStore = inject(CartStore)) => ({
    products_list: computed(() => {
      const list: Product[] = products().map((product) => ({ ...product }));

      return list.map((product) => {
        product.inCart = cartStore.products().some((item) => {
          return item.id === product.id;
        });
        return product;
      });
    }),
  })),
  withMethods(
    (
      store: any,
      productsApi = inject(ProductsApiService),
      toastr = inject(ToastrService)
    ) => ({
      updateCurrentPage: (type: string) => {
        let newPageNumber;
        if (type === 'next') {
          newPageNumber = store.options().page += 1;
        } else {
          newPageNumber = store.options().page -= 1;
        }
        patchState(store, {
          options: {
            ...store.options(),
            page: newPageNumber,
          },
        });
      },
      updateFilter: rxMethod<Event>((filter$) =>
        filter$.pipe(
          debounceTime(300),
          tap((filter) => {
            console.log('filter', (filter.target as HTMLInputElement).value);
            patchState(store, {
              options: {
                ...store.options(),
                filter: (filter.target as HTMLInputElement).value,
              },
            });
          })
        )
      ),
      loadProducts: rxMethod<{ page: number; limit: number; filter: string }>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((options) => {
            return productsApi
              .loadProducts(options.page, options.limit, options.filter)
              .pipe(
                tapResponse({
                  next: (products: Product[]) => {
                    patchState(store, {
                      products: products,
                      status: 'success',
                    });
                  },
                  error: (error: any) => {
                    patchState(store, {
                      status: 'error',
                      error: error.error.message,
                    });
                  },
                })
              );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit({ options, loadProducts }) {
      loadProducts(options);
    },
  })
);
