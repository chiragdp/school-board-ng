import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signedInUser$: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);
  signedInAdmin$: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  currentRole$: BehaviorSubject<'admin' | 'user' | 'invalid' | null> =
    new BehaviorSubject<'admin' | 'user' | 'invalid' | null>(null);
  constructor() {}

  /**
   * Marking the user as admin through behaviour subject
   */
  markAdmin() {
    this.currentRole$.next('admin');
  }

  /**
   * Marking the user as Student/user through behaviour subject
   */
  markUser() {
    this.currentRole$.next('user');
  }

  /**
   * Get the current user status!
   */
  getCurrentUser() {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user) as User;

      if (userObj.role === 'admin') {
        this.markAdmin();
      } else {
        this.markUser();
      }
    } else {
      this.signedInAdmin$.next(false);
      this.signedInUser$.next(false);
    }
  }

  /**
   * Logout user and marking all the value as false of behaviour
   */
  logout() {
    this.currentRole$.next('invalid');
  }
}
