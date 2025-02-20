import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomerClass } from '../shared/customer-interface';
import { data_url } from '../shared/commonValues';
import { UserInterface } from '../shared/user-interface';

const httpOpions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${data_url}users`

  constructor(private http: HttpClient) { }

  getUserList(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.url);
  }

  addUser(user: UserInterface): Observable<UserInterface> {    
    return this.http.post<UserInterface>(this.url, user, httpOpions)
  }

  deleteUser(user: UserInterface): Observable<UserInterface> {
    return this.http.delete<UserInterface>(`${this.url}/${user.id}`);
  }  

  updateUser(user: UserInterface): Observable<UserInterface> {    
    return this.http.put<UserInterface>(`${this.url}/${user.id}`, user, httpOpions)
  }


}
