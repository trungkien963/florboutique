import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
          {
              path: '', component: LayoutComponent,
              children: [
                  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
                  { path: 'track-order', loadChildren: () => import('./features/order-tracking/order-tracking.module').then(m => m.OrderTrackingModule) },
                  { path: 'our-story', loadChildren: () => import('./features/our-story/our-story.module').then(m => m.OurStoryModule) },
              ]
          },
          // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
          // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
          //{ path: 'notfound', component: PageNotFoundComponent },
          { path: '**', redirectTo: '/notfound' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
