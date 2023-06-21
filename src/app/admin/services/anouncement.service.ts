import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anouncement } from 'src/app/models/anouncement.model';

@Injectable({
  providedIn: 'root',
})
export class AnouncementService {
  constructor(private http: HttpClient) {}

  createAnouncement(anouncement: Anouncement) {
    return this.http.post('/api/anouncements', { ...anouncement });
  }

  updateAnouncement(id: number, anoucement: Anouncement) {
    return this.http.put(`/api/anouncements/${id}`, { ...anoucement });
  }

  deleteAnouncement(id: number) {
    return this.http.delete(`/api/anouncements/${id}`);
  }
}
