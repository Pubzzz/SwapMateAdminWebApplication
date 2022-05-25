import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/v1/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(baseUrl);
  }

  get(nic: any): Observable<Customer> {
    return this.http.get(`${baseUrl}/${nic}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(nic: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${nic}`, data);
  }

  delete(nic: any): Observable<any> {
    return this.http.delete(`${baseUrl}?document_id=${nic}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${baseUrl}?title=${title}`);
  }
}
