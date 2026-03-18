import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorefrontRoutingModule } from './storefront-routing.module';
import { StorefrontComponent } from './storefront.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [StorefrontComponent],
  imports: [
    CommonModule,
    StorefrontRoutingModule,
    RippleModule,
    ButtonModule,
    BadgeModule,
    DialogModule,
    FormsModule,
    SelectModule,
    TextareaModule,
    InputNumberModule
  ]
})
export class StorefrontModule { }
