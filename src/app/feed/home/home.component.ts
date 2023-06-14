import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { PaginatorState } from 'primeng/paginator';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { FeedModel } from 'src/app/models/feed.model';
import { FeedService, FilterFeedsOptions } from 'src/app/services/feed.service';
import * as _ from 'lodash';

export interface Paginator {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading = false;
  feedsObj: {
    feeds: FeedModel[];
    totalFeeds: number;
  } = {
    feeds: [],
    totalFeeds: 0,
  };
  @ViewChild('paginator1') paginator: any;

  constructor(
    private router: Router,
    private feedService: FeedService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('params==', params);
      const requiredParams = _.pick(params, [
        '_page',
        '_sort',
        '_order',
        '_limit',
      ]);
      console.log(requiredParams);
      if (Object.keys(requiredParams).length > 0) {
        setTimeout(() => this.paginator.changePage(1));
        this.getFeeds(requiredParams);
      } else {
        this.getFeeds({ _page: 1, _limit: 10 });
      }
    });
  }

  getFeeds(filters: FilterFeedsOptions) {
    this.loading = true;
    this.feedService
      .getFeeds(filters)
      .pipe(
        catchError((err) => {
          console.log(err);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        this.feedsObj.feeds = res.body || [];
        const totalFeeds = res.headers.get('X-Total-Count');
        this.feedsObj.totalFeeds = parseInt(totalFeeds || '1');
      });
  }

  paginate(event: PaginatorState) {
    const currentPage = event.page! + 1;
    this.router.navigate(['/feed'], {
      queryParams: {
        _page: currentPage,
      },
    });
  }
}
