import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { HomeComponent } from './home/home.component';
import { FeedLayoutComponent } from './feed-layout/feed-layout.component';
import { primeModules } from './prime-modules';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, FeedLayoutComponent, ViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FeedRoutingModule,
    SharedModule,
    ...primeModules,
  ],
  providers: [DataViewLayoutOptions],
})
export class FeedModule {}
