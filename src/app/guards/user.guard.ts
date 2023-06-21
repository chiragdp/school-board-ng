import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, skipWhile, take, tap } from 'rxjs';
import { UserService } from '../services/user.service';
type canloadType =
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>;

@Injectable({
  providedIn: 'root',
})
export class UserGaurd implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}
  canLoad(_route: Route, _segments: UrlSegment[]): canloadType {
    return this.userService.currentRole$.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((authenticated) => {
        if (authenticated && ['invalid'].includes(authenticated)) {
          this.router.navigate(['/']);
        }
      }),
      map((_) => {
        return true;
      })
    );
  }
}
