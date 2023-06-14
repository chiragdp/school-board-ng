import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedModel } from '../models/feed.model';

export interface FilterFeedsOptions {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeeds(filters: FilterFeedsOptions) {
    return this.http.get<FeedModel[]>('/api/anouncements', {
      params: {
        ...filters,
      },
      observe: 'response',
    });
  }

  getFeedById(id: number) {
    return this.http.get<FeedModel>(`/api/anouncements/${id}`);
  }
}
