import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  editMode = false;
  anouncementId = null;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      if (param['anouncementId']) {
        console.log('ANouncementsId===', param['anouncementId']);
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
