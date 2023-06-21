import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedModel } from 'src/app/models/feed.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewComponent implements OnInit {
  feed!: FeedModel;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    /**
     * Getting single feed by their id through resolver and adding into the view.
     */
    this.route.data.subscribe(({ feed }) => {
      this.feed = feed;
    });
  }
}
