import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomerClass } from '../shared/customer-interface';
import { data_url } from '../shared/commonValues';

const httpOpions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = `${data_url}customers`

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<CustomerClass[]> {
    return this.http.get<CustomerClass[]>(this.url);
  }

  addCustomer(cus: CustomerClass): Observable<CustomerClass> {    
    return this.http.post<CustomerClass>(this.url, cus, httpOpions)
  }

  deleteCustomer(cus: CustomerClass): Observable<CustomerClass> {
    return this.http.delete<CustomerClass>(`${this.url}/${cus.id}`);
  }  

  updateCustomer(cus: CustomerClass): Observable<CustomerClass> {    
    return this.http.put<CustomerClass>(`${this.url}/${cus.id}`, cus, httpOpions)
  }


}
