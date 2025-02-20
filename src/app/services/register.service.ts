import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { guardKey } from '../shared/commonValues';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private router: Router) { }

  logout(){
    const confirmation = confirm('Do you want to logout?')
    if (confirmation){
      localStorage.removeItem(guardKey)
      localStorage.removeItem('userID')
      localStorage.removeItem('nickName')
      localStorage.removeItem('userName')
      this.router.navigate(['login'])
    }
  }
}
