import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  items: MenuItem[] = [];

  constructor(private router: Router, private userService: UserService) {}
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
        command: () => {
          localStorage.clear();
          this.userService.logout();
          this.router.navigateByUrl('/auth/login');
        },
      },
    ];
  }
}
