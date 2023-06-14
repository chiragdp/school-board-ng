import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { HomeComponent } from './home/home.component';
import { FeedLayoutComponent } from './feed-layout/feed-layout.component';
import { primeModules } from './prime-modules';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [HomeComponent, FeedLayoutComponent, ViewComponent],
  imports: [CommonModule, FeedRoutingModule, ...primeModules],
  providers: [DataViewLayoutOptions],
})
export class FeedModule {}
