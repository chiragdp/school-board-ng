import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { FeedLayoutComponent } from './feed/feed-layout/feed-layout.component';
import { AdminGaurd } from './guards/admin.guard';
import { UserGaurd } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canLoad: [AdminGaurd],
    children: [
      {
        path: '',
        canLoad: [AdminGaurd],
        loadChildren: () =>
          import('./admin/admin.module').then((module) => module.AdminModule),
      },
    ],
  },
  {
    path: 'feed',
    component: FeedLayoutComponent,
    canLoad: [UserGaurd],
    children: [
      {
        path: '',
        canLoad: [UserGaurd],
        loadChildren: () =>
          import('./feed/feed.module').then((module) => module.FeedModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
