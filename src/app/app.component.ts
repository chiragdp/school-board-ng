import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'boards';
  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser();
    this.primengConfig.ripple = true;
  }
}
