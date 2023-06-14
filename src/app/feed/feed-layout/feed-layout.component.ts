import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-feed-layout',
  templateUrl: './feed-layout.component.html',
  styleUrls: ['./feed-layout.component.scss'],
})
export class FeedLayoutComponent {
  items: MenuItem[] = [];

  constructor() {}
  ngOnInit() {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
