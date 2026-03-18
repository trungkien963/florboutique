import { Component } from '@angular/core';
import { LanguageService } from '../../../../shared/services/language.service';

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

  constructor(public lang: LanguageService) {}

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
}
