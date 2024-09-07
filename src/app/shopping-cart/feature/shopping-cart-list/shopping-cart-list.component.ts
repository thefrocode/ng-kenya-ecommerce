import { Component, inject } from '@angular/core';
import { CartStore } from '../../data-access/cart.store';

@Component({
  selector: 'shopping-cart-list',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart-list.component.html',
  styleUrl: './shopping-cart-list.component.css',
})
export class ShoppingCartListComponent {
  cartStore = inject(CartStore);
}
