import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, first, take, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  loading = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  loginUser() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    } else {
      this.loading = true;
      const values = this.loginForm.getRawValue();
      this.authService
        .loginUser(values.username!, values.password!)
        .pipe(
          take(1),
          tap((user) => {
            if (user.length > 0) {
              localStorage.setItem('user', JSON.stringify(user[0]));
              if (user[0].role === 'user') {
                this.userService.markUser();
                this.router.navigateByUrl('/feed');
              } else {
                this.userService.markAdmin();
                this.router.navigateByUrl('/admin');
              }
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Invalid Credential Details!',
              });
              this.loading = false;
            }
          }),
          catchError((err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong!',
            });
            this.loading = false;
            return EMPTY;
          })
        )
        .subscribe(() => {});
    }
  }
}
