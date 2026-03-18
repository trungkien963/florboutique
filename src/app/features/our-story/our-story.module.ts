import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurStoryRoutingModule } from './our-story-routing.module';
import { OurStoryComponent } from './our-story.component';

@NgModule({
  declarations: [
    OurStoryComponent
  ],
  imports: [
    CommonModule,
    OurStoryRoutingModule
  ]
})
export class OurStoryModule { }
