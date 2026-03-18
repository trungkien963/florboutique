import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Lang } from '../../models/language.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  menuOpen = false;
  cartVisible = false;

  constructor(public lang: LanguageService, public cartService: CartService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  setLang(l: Lang) {
    this.lang.switch(l);
    this.menuOpen = false;
  }
}
