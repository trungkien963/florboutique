import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderPayload {
  name: string;
  phone: string;
  address: string;
  items: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Thay URL này bằng Google Apps Script Web App URL của bạn
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycZjRuV-d-tmG8OV7VQzuk79PCJyh4tpwm8Y8Ybk2VKe6SuoKT9AL4nBretefnvIDL2A/exec'; 

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(product: any) {
    const currentItems = this.cartItems.getValue();
    const existing = currentItems.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { 
        id: product.id, 
        name: product.name || product.title, 
        price: product.price, 
        image: product.image,
        quantity: 1 
      }]);
    }
  }

  removeFromCart(id: string | number) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(i => i.id !== id));
  }

  updateQuantity(id: string | number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.cartItems.getValue().reduce((sum, item) => sum + item.quantity, 0);
  }

  submitOrder(userInfo: { name: string, phone: string, address: string }): Observable<any> {
    const items = this.cartItems.getValue();
    const total = this.getTotalPrice();
    
    // Convert items array to string summary
    const itemsSummary = items.map(i => `${i.name} (x${i.quantity}) - $${i.price * i.quantity}`).join('\n');

    const payload: OrderPayload = {
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address,
      items: itemsSummary,
      total: total
    };

    // Google Apps Script usually requires a POST request configured correctly to bypass CORS
    // with 'Content-Type': 'text/plain;charset=utf-8' OR via multipart/form-data. 
    return this.http.post(this.GOOGLE_SCRIPT_URL, payload, { 
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      responseType: 'text' 
    });
  }
}
