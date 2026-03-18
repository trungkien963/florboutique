import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Lang } from '../../models/language.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  menuOpen = false;

  constructor(public lang: LanguageService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  setLang(l: Lang) {
    this.lang.switch(l);
    this.menuOpen = false;
  }
}
