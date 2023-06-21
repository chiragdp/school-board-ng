import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedResolver } from './resolvers/feed.resolver';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'anouncements/:anouncementId',
    component: ViewComponent,
    resolve: {
      feed: FeedResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
