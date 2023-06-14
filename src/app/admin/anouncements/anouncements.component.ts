import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-anouncements',
  templateUrl: './anouncements.component.html',
  styleUrls: ['./anouncements.component.scss'],
  providers: [ConfirmationService],
})
export class AnouncementsComponent {
  anouncements = [
    {
      id: 1,
      title: 'College opening date',
      description: 'College is opening from 5 july 2023',
      uploadDate: new Date(),
    },
    {
      id: 2,
      title: 'College opening date',
      description: 'College is opening from 5 july 2023',
      uploadDate: new Date(),
    },
    {
      id: 3,
      title: 'College opening date',
      description: 'College is opening from 5 july 2023',
      uploadDate: new Date(),
    },
    {
      id: 4,
      title: 'College opening date',
      description: 'College is opening from 5 july 2023',
      uploadDate: new Date(),
    },
  ];

  constructor(private confirmationService: ConfirmationService) {}

  confirm(event: Event, anouncementId: number) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        console.log('accepted', anouncementId);
      },
      reject: () => {
        console.log('rejected==', anouncementId);
      },
    });
  }
}
