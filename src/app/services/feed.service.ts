import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedModel } from '../models/feed.model';

export interface FilterFeedsOptions {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  _q?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  /**
   * gets the anouncements list from the backend server
   * @param filters FilterFeedsOptions
   * @returns <FeedModel[]>
   */
  getFeeds(filters: FilterFeedsOptions) {
    return this.http.get<FeedModel[]>('/api/anouncements', {
      params: {
        ...filters,
      },
      observe: 'response',
    });
  }

  /**
   * get the anouncement by id!
   * @param id number
   * @returns Observer<FeedModel>
   */
  getFeedById(id: number) {
    return this.http.get<FeedModel>(`/api/anouncements/${id}`);
  }
}
