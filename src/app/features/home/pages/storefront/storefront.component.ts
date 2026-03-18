import { Component } from '@angular/core';
import { LanguageService } from '../../../../shared/services/language.service';
import { CartService } from '../../../../shared/services/cart.service';

export interface Product {
  id: number;
  nameKey: string;
  price: number;
  image: string;
  tagKey?: string;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss'],
  standalone: false
})
export class StorefrontComponent {
  constructor(public lang: LanguageService, private cartService: CartService) {}

  displayCustomPopup: boolean = false;
  selectedProduct: Product | null = null;
  customQuantity: number = 1;
  wrappingColor: any;
  customMessage: string = '';

  wrappingColors = [
    { label: 'Kraft (Rustic)', value: 'kraft' },
    { label: 'Blush Pink', value: 'pink' },
    { label: 'Classic White', value: 'white' },
    { label: 'Elegant Black', value: 'black' }
  ];

  products: Product[] = [
    { id: 1, nameKey: 'productRoseName',      price: 68, image: 'assets/images/product-rose.png',      tagKey: 'productBestseller' },
    { id: 2, nameKey: 'productTulipName',     price: 45, image: 'assets/images/product-tulip.png',     tagKey: 'productNew'        },
    { id: 3, nameKey: 'productSunflowerName', price: 52, image: 'assets/images/product-sunflower.png'                               },
    { id: 4, nameKey: 'productPeonyName',     price: 89, image: 'assets/images/product-peony.png',     tagKey: 'productPremium'    },
    { id: 5, nameKey: 'productOrchidName',    price: 75, image: 'assets/images/product-orchid.png'                                  },
    { id: 6, nameKey: 'productLavenderName',  price: 32, image: 'assets/images/product-lavender.png',  tagKey: 'productSeasonal'   },
  ];

  getProductName(p: Product): string {
    return (this.lang.t as any)[p.nameKey] ?? p.nameKey;
  }

  getTagLabel(tagKey: string): string {
    return (this.lang.t as any)[tagKey] ?? tagKey;
  }

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: this.getProductName(product),
      price: product.price,
      image: product.image
    });
  }

  openProductDetail(product: Product) {
    this.selectedProduct = product;
    this.customQuantity = 1;
    this.wrappingColor = this.wrappingColors[0];
    this.customMessage = '';
    this.displayCustomPopup = true;
  }

  addCustomizedToCart() {
    if (!this.selectedProduct) return;

    // Append customization details to name
    let customizedName = this.getProductName(this.selectedProduct);
    if (this.wrappingColor) {
      customizedName += ` - ${this.wrappingColor.label}`;
    }
    if (this.customMessage && this.customMessage.trim().length > 0) {
      customizedName += ` (Msg: ${this.customMessage.trim()})`;
    }

    // Creating unique ID to differentiate customizations
    const safeMessage = this.customMessage ? encodeURIComponent(this.customMessage.trim()) : '';
    const customId = `${this.selectedProduct.id}-${this.wrappingColor?.value || 'default'}-${safeMessage}`;

    // Add required count
    for (let i = 0; i < this.customQuantity; i++) {
        this.cartService.addToCart({
          id: customId,
          name: customizedName,
          price: this.selectedProduct.price,
          image: this.selectedProduct.image
        });
    }

    this.displayCustomPopup = false;
  }
}
