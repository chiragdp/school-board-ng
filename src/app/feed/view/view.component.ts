import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedModel } from 'src/app/models/feed.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  feed!: FeedModel;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(({ feed }) => {
      this.feed = feed;
      console.log(feed);
    });
  }
}
