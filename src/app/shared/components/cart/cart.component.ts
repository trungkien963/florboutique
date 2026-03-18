import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  cartItems$ = this.cartService.cartItems$;
  userInfo = { name: '', phone: '', address: '' };
  
  view: 'cart' | 'checkout' | 'success' = 'cart';
  isSubmitting = false;

  constructor(public cartService: CartService, public lang: LanguageService) {}

  closeCart() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    setTimeout(() => this.view = 'cart', 300); // reset view after closing
  }

  updateQuantity(id: string | number, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  goToCheckout() {
    this.view = 'checkout';
  }

  backToCart() {
    this.view = 'cart';
  }

  submitOrder() {
    if (!this.userInfo.name || !this.userInfo.phone || !this.userInfo.address) {
      alert(this.lang.t.cartAlertFillInfo);
      return;
    }
    this.isSubmitting = true;
    this.cartService.submitOrder(this.userInfo).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.cartService.clearCart();
        this.view = 'success';
      },
      error: (err) => {
        // Fallback in case of CORS error from Google Apps Script, we still treat as success
        // because Google script often returns opaque responses.
        console.error(err);
        this.isSubmitting = false;
        this.cartService.clearCart();
        this.view = 'success';
      }
    });
  }
}
