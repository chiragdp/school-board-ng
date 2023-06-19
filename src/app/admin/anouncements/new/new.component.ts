import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { Anouncement } from 'src/app/models/anouncement.model';
import { AnouncementService } from '../../services/anouncement.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [MessageService],
})
export class NewComponent implements OnInit {
  editMode = false;
  anouncementId = null;
  loading = false;
  anouncementForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    uploadDate: new FormControl(new Date().toISOString().substring(0, 10), [
      Validators.required,
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private anouncementService: AnouncementService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ anouncement }) => {
      if (anouncement?.id) {
        this.editMode = true;
        this.anouncementId = anouncement.id;
        this.anouncementForm.patchValue({
          ...anouncement,
          uploadDate: new Date().toISOString().substring(0, 10),
        });
      }
    });
  }

  onAnouncementCreateSubmit() {
    if (this.anouncementForm.invalid) {
      Object.values(this.anouncementForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }
    if (this.editMode) {
      if (this.anouncementId) {
        this.updateAnouncementById(this.anouncementId);
      }
    } else {
      this.createAnouncement();
    }
  }

  updateAnouncementById(id: number) {
    this.loading = true;
    const values = this.anouncementForm.getRawValue() as Anouncement;
    this.anouncementService
      .updateAnouncement(id, values)
      .pipe(
        tap((anoucement) => {
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Anouncement Updated Successfully!',
            });
          }, 1000);
          this.router.navigateByUrl('/admin/dashboard');
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Anouncement Update fail!',
          });
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {});
  }

  createAnouncement() {
    this.loading = true;
    const values = this.anouncementForm.getRawValue() as Anouncement;
    this.anouncementService
      .createAnouncement(values)
      .pipe(
        tap((anoucement) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Anouncement Created Successfully!',
          });
          this.router.navigateByUrl('/admin/dashboard');
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Anouncement add fail!',
          });
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {});
  }
}
