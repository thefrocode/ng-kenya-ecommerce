import { Component, inject } from '@angular/core';
import { ShoppingCartListComponent } from '../shopping-cart/feature/shopping-cart-list/shopping-cart-list.component';
import { ProductsListComponent } from '../products/feature/products-list/products-list.component';
import { CartStore } from '../shopping-cart/data-access/cart.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShoppingCartListComponent, ProductsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cartStore = inject(CartStore);
}
