import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { FeedModel } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

@Injectable({
  providedIn: 'root',
})
export class FeedResolver implements Resolve<FeedModel> {
  constructor(
    private router: Router,
    private feedService: FeedService,
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * getting the anouncement from the server before viewing to the user
   * if the anouncement not found then redirect to feed.
   * @param route ActivatedRouteSnapshote
   * @param state RouterStateSnapshot
   * @returns FeedModel | Observable<FeedModel> | Promise<FeedModel>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): FeedModel | Observable<FeedModel> | Promise<FeedModel> {
    const { anouncementId } = route.params;
    return this.feedService.getFeedById(anouncementId).pipe(
      map((data) => {
        return { ...data };
      }),
      catchError((err) => {
        this.router.navigateByUrl('/feed');
        return EMPTY;
      })
    );
  }
}
