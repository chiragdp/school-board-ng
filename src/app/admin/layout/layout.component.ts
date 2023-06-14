import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'Anouncements',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/admin/anouncements/new',
          },
        ],
      },
      {
        label: 'Feeds',
        icon: 'pi pi-fw',
        routerLink: '/feed',
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
