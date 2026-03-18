import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { OrderTrackingComponent } from './order-tracking.component';

@NgModule({
  declarations: [
    OrderTrackingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderTrackingRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule
  ]
})
export class OrderTrackingModule { }
