import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedResolver } from '../feed/resolvers/feed.resolver';
import { NewComponent } from './anouncements/new/new.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'anouncements/new',
    component: NewComponent,
  },
  {
    path: 'anouncements/edit/:anouncementId',
    component: NewComponent,
    resolve: {
      anouncement: FeedResolver,
    },
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
