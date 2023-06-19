import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * calls the backend for the user registration
   * @param user User
   * @returns Observer<User>
   */
  registerUser(user: User) {
    return this.http.post<User>('/api/users', { ...user, role: 'user' });
  }

  /**
   * calls the backend for the user login and returns the user detail
   * @param username string
   * @param password string
   * @returns Observer<User>
   */
  loginUser(username: string, password: string) {
    return this.http.get<User[]>(
      `/api/users?username_like=${username}&password_like=${password}`
    );
  }
}
