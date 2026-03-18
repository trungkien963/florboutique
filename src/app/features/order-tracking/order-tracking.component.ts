import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-order-tracking',
  standalone: false,
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss',
})
export class OrderTrackingComponent {
  phoneNumber: string = '';
  hasSearched: boolean = false;
  orders: any[] = [];
  isLoading: boolean = false;

  constructor(public lang: LanguageService) {}

  checkOrder() {
    if (!this.phoneNumber) return;
    this.isLoading = true;
    this.hasSearched = false;
    
    // Simulate API delay
    setTimeout(() => {
      this.hasSearched = true;
      this.isLoading = false;
      
      // Fake response
      const phoneInput = this.phoneNumber.replace(/\s+/g, '');
      if (phoneInput === '000') {
          this.orders = []; // Empty result test case
      } else if (phoneInput === '0348997157' || phoneInput === '348997157') {
          this.orders = [
            {
              id: 'FLR-8921',
              date: new Date('2026-03-18T17:41:42'),
              total: 113,
              status: 'completed',
              items: [
                { name: this.lang.current === 'vi' ? 'Bó Hồng Đỏ' : 'Crimson Rose Bouquet', image: 'assets/images/product-rose.png', quantity: 1, price: 68 },
                { name: this.lang.current === 'vi' ? 'Tulip Pastel Mix' : 'Pastel Tulip Mix', image: 'assets/images/product-tulip.png', quantity: 1, price: 45 }
              ]
            },
            {
              id: 'FLR-8925',
              date: new Date('2026-03-18T17:44:33'),
              total: 141,
              status: 'pending',
              items: [
                { name: this.lang.current === 'vi' ? 'Hướng Dương Vườn' : 'Sunflower Garden', image: 'assets/images/product-sunflower.png', quantity: 1, price: 52 },
                { name: this.lang.current === 'vi' ? 'Mẫu Đơn Hồng Nhạt' : 'Blush Peony Dream', image: 'assets/images/product-peony.png', quantity: 1, price: 89 }
              ]
            }
          ];
      } else {
          // No orders exist for other numbers in this mock environment
          this.orders = [];
      }
    }, 600);
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch(status) {
      case 'pending': return 'warn';
      case 'delivering': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      'pending': this.lang.current === 'vi' ? 'Đang xử lý' : 'Pending',
      'delivering': this.lang.current === 'vi' ? 'Đang giao' : 'Delivering',
      'completed': this.lang.current === 'vi' ? 'Đã giao' : 'Completed',
      'cancelled': this.lang.current === 'vi' ? 'Đã hủy' : 'Cancelled'
    };
    return labels[status] || status;
  }
}
