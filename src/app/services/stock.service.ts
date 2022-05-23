import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Stock } from '../models/stock.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/v1/stocks';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(baseUrl);
  }

  get(Sid: any): Observable<Stock> {
    return this.http.get(`${baseUrl}/${Sid}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(Sid: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${Sid}`, data);
  }

  delete(Sid: any): Observable<any> {
    return this.http.delete(`${baseUrl}?document_id=${Sid}`);
  }

  uploadImages(id: any, data: any) {
    return this.http.patch<String>(`${baseUrl}?document_id=${id}`, data);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${baseUrl}?title=${title}`);
  }
}
