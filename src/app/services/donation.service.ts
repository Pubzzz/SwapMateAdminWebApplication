import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Donation } from '../models/donation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/v1/donation';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Donation[]> {
    return this.http.get<Donation[]>(baseUrl);
  }

  get(did: any): Observable<Donation> {
    return this.http.get(`${baseUrl}/${did}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(did: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${did}`, data);
  }

  delete(did: any): Observable<any> {
    return this.http.delete(`${baseUrl}?document_id=${did}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${baseUrl}?title=${title}`);
  }
}
