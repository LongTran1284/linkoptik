import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {
  private subject = new Subject<any>();

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  close(parent: string = 'lgModal'){    
    this.subject.next({open: false, parentID: parent})
    document.body.style.setProperty('overflow', 'auto')
  }

  open(parent: string = 'lgModal'){    
    this.subject.next({open: true, parentID: parent})    
    document.body.style.setProperty('overflow', 'hidden')
  }
}
