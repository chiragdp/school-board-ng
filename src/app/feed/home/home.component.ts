import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { FeedModel } from 'src/app/models/feed.model';
import { FeedService, FilterFeedsOptions } from 'src/app/services/feed.service';
import * as _ from 'lodash';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/**
 * SortOptions for the Listview Interface
 * name: label for the drop down
 * value: actual value when get selected
 */
interface SortOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // state values
  loading = false;
  feedsObj: {
    feeds: FeedModel[];
    totalFeeds: number;
  } = {
    feeds: [],
    totalFeeds: 0,
  };

  sortOptions: SortOption[] = [
    {
      name: 'upload Date Descending',
      value: 'desc',
    },
    {
      name: 'upload Date Ascending',
      value: 'asc',
    },
  ];

  @ViewChild('paginator1', { static: true }) paginator: any;

  // search form
  searchForm = new FormGroup({
    q: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private router: Router,
    private feedService: FeedService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const requiredParams = _.pick(params, [
        '_page',
        '_sort',
        '_order',
        '_limit',
        'q',
      ]);

      if (requiredParams.q) {
        this.searchForm.patchValue({ q: requiredParams.q });
      }

      if (requiredParams._page || requiredParams.q) {
        this.getFeeds(requiredParams);
      } else {
        this.getFeeds({ ...requiredParams, _page: 1, _limit: 10 });
      }
    });
  }

  /**
   * This method will be called when user will click on search button
   */
  onSearchSubmit() {
    const values = this.searchForm.getRawValue();
    const query = values.q || '';
    if (this.searchForm.invalid || query.trim().length < 2) {
      Object.values(this.searchForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    } else {
      this.router.navigate(['/feed'], {
        queryParams: {
          q: query,
          _page: 1,
        },
      });
    }
  }

  /**
   * used to handle the drop down changes when user change.
   * @param event DropDownChangeEvent
   */
  handleDropdown(event: DropdownChangeEvent) {
    this.router.navigate(['/feed'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        _sort: 'uploadDate',
        _order: event.value.value,
        _page: 1,
      },
    });
    setTimeout(() => this.paginator.changePage(0));
  }

  /**
   * get feed of anouncements for the users/students
   * @param filters FilterFeedsOptions
   */
  getFeeds(filters: FilterFeedsOptions) {
    this.loading = true;
    this.feedService
      .getFeeds(filters)
      .pipe(
        catchError((err) => {
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
          if (filters._page != 1) {
            setTimeout(() =>
              this.paginator.changePage((filters._page || 1) - 1)
            );
          }
        })
      )
      .subscribe((res) => {
        this.feedsObj.feeds = res.body || [];
        const totalFeeds = res.headers.get('X-Total-Count');
        this.feedsObj.totalFeeds = parseInt(totalFeeds || '1');
      });
  }

  /**
   * Pagination Handling for the feeds.
   * @param event PaginatorStore
   */
  paginate(event: PaginatorState) {
    const currentPage = event.page! + 1;
    this.router.navigate(['/feed'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        _page: currentPage,
      },
    });
  }
}
