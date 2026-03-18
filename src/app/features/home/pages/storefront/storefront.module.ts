import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorefrontRoutingModule } from './storefront-routing.module';
import { StorefrontComponent } from './storefront.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [StorefrontComponent],
  imports: [
    CommonModule,
    StorefrontRoutingModule,
    RippleModule,
    ButtonModule,
    BadgeModule,
  ]
})
export class StorefrontModule { }
