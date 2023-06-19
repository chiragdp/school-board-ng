import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Anouncement } from 'src/app/models/anouncement.model';
import { FeedService, FilterFeedsOptions } from 'src/app/services/feed.service';
import * as _ from 'lodash';
import { PaginatorState } from 'primeng/paginator';
import { finalize, tap } from 'rxjs';
import { AnouncementService } from '../services/anouncement.service';

@Component({
  selector: 'app-anouncements',
  templateUrl: './anouncements.component.html',
  styleUrls: ['./anouncements.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AnouncementsComponent implements OnInit {
  loading = false;
  anouncementsObj: {
    anouncements: Anouncement[];
    total: number;
  } = {
    anouncements: [],
    total: 0,
  };

  @ViewChild('paginator1', { static: true }) paginator: any;
  constructor(
    private confirmationService: ConfirmationService,
    private feedService: FeedService,
    private route: ActivatedRoute,
    private router: Router,
    private anouncementService: AnouncementService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const requiredParams = _.pick(params, [
        '_page',
        '_sort',
        '_order',
        '_limit',
      ]);

      if (Object.keys(requiredParams).length > 0) {
        this.getAnouncements(requiredParams);
      } else {
        this.getAnouncements({ _page: 1, _limit: 10 });
      }
    });
  }

  /**
   * when user click on ok from delete popup message this method gets called
   * delete the anouncement
   * @param id number
   */
  onAnouncementDelete(id: number) {
    this.anouncementService
      .deleteAnouncement(id)
      .pipe(
        tap((value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted!',
            detail: 'Anouncement deleted!',
          });
        }),
        tap(() => {
          this.getAnouncements({ _page: 1, _limit: 10 });
        })
      )
      .subscribe(() => {});
  }

  getAnouncements(filters: FilterFeedsOptions) {
    this.feedService
      .getFeeds(filters)
      .pipe(
        finalize(() => {
          if (filters._page !== 1) {
            setTimeout(() =>
              this.paginator.changePage((filters._page || 1) - 1)
            );
          }
        })
      )
      .subscribe((anouncements) => {
        this.anouncementsObj.anouncements = anouncements.body || [];
        this.anouncementsObj.total = parseInt(
          anouncements.headers.get('X-Total-Count') || '0'
        );
      });
  }

  /**
   * When page gets change
   * @param event PaginatorState
   */
  onPageChange(event: PaginatorState) {
    const currentPage = event.page! + 1;
    this.router.navigate(['/admin/dashboard'], {
      queryParams: {
        _page: currentPage,
      },
    });
  }

  /**
   * when user click on delete button
   * @param event Event
   * @param anouncementId number
   */
  onDeleteButtonClick(event: Event, anouncementId: number) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.onAnouncementDelete(anouncementId);
      },
      reject: () => {},
    });
  }
}
