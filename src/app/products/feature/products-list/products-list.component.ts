import { Component, effect, inject } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { CartStore } from '../../../shopping-cart/data-access/cart.store';
import { ProductsStore } from '../../data-access/products.store';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  productsStore = inject(ProductsStore);
  cartStore = inject(CartStore);

  constructor() {
    effect(() => {
      console.log(
        'ProductsListComponent: loadProducts',
        this.productsStore.products_list()
      );
    });
  }
  onProductAdd(product: any) {
    this.cartStore.addToCart(product);
  }
  onProductRemove(product: any) {
    this.cartStore.removeFromCart(product);
  }
}
