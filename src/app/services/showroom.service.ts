import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Showroom } from '../models/showroom.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/v1/showroom';

@Injectable({
  providedIn: 'root',
})
export class ShowroomService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Showroom[]> {
    return this.http.get<Showroom[]>(baseUrl);
  }

  get(srid: any): Observable<Showroom> {
    return this.http.get(`${baseUrl}/${srid}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(srid: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${srid}`, data);
  }

  delete(srid: any): Observable<any> {
    return this.http.delete(`${baseUrl}?document_id=${srid}`);
  }

  uploadImages(id: any, data: any):Observable<String>{
    return this.http.patch<String>(`${baseUrl}?document_id=${id}`,data);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Showroom[]> {

    return this.http.get<Showroom[]>(`${baseUrl}?title=${title}`);
  }
}
