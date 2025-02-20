import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private subject = new Subject();
  
  pushData(data: any): void {
    console.log('pushing')
    this.subject.next(data);
  }

  getData(): Observable<any> {
    console.log('getting')
    return this.subject.asObservable();
  }  
}
