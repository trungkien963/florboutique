import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lang, Translations } from '../models/language.model';
import { VI } from '../translations/vi';
import { EN } from '../translations/en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang = new BehaviorSubject<Lang>('en');
  lang$ = this._lang.asObservable();

  get current(): Lang { return this._lang.value; }

  get t(): Translations {
    return this._lang.value === 'vi' ? VI : EN;
  }

  switch(lang: Lang) {
    this._lang.next(lang);
  }

  toggle() {
    this._lang.next(this._lang.value === 'vi' ? 'en' : 'vi');
  }

  formatMoney(amount: number): string {
    if (this._lang.value === 'vi') {
      return (amount * 25000).toLocaleString('vi-VN') + ' ₫';
    }
    return '$' + amount.toLocaleString('en-US');
  }
}
