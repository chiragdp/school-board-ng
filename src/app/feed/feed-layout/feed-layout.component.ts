import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed-layout',
  templateUrl: './feed-layout.component.html',
  styleUrls: ['./feed-layout.component.scss'],
})
export class FeedLayoutComponent {
  items: MenuItem[] = [];

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit() {
    this.items = [
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
