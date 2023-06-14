import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { primeModules } from './prime-modules';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { AnouncementsComponent } from './anouncements/anouncements.component';
import { NewComponent } from './anouncements/new/new.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    AnouncementsComponent,
    NewComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ...primeModules],
})
export class AdminModule {}
