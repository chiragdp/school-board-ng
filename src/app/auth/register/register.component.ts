import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { catchError, EMPTY, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { WhiteSpaceValidator } from 'src/app/validators/white-space-validator.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      WhiteSpaceValidator.cannotContainSpace,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      WhiteSpaceValidator.cannotContainSpace,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  registerUser() {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach((control) => {
        control.setValue(control.value?.trim() || null);
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    } else {
      this.loading = true;
      const values = this.registerForm.getRawValue();
      this.authService
        .registerUser({
          name: values.name!,
          username: values.username!,
          password: values.password!,
        })
        .pipe(
          tap((user) => {
            this.userService.markUser();
            window.localStorage.setItem('user', JSON.stringify(user));
            this.router.navigateByUrl('/feed');
          }),
          catchError((err) => {
            return EMPTY;
          })
        )
        .subscribe(() => {});
    }
  }
}
