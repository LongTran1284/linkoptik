import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { guardKey } from '../shared/commonValues';

export const authGuard: CanActivateFn = (route, state) => {  
  const role = route.data['role']
  const userLogin = localStorage.getItem(guardKey)
  const router = inject(Router)  
  const userID = localStorage.getItem('userID')
  const urlID = state.url.replace(/[^0-9]/g, '')

  // console.log('guard:', urlID)
  // console.log('guard:', `userLogin=${userLogin}, role=${role}`)
  
  if (userLogin){
    if (userLogin === 'admin') {return true} // admin can navigate anywhere    
    else {      
      let path: string = userLogin
      if (userLogin !== role ) {
        if (userLogin === 'user') path = `${userLogin}/${userID}`        
        router.navigate([path])
      } 
      else if (userLogin === 'user' && userID !== urlID) router.navigate([`${userLogin}/${userID}`])
      
      return true
    }
  } else {router.navigate(['login']); return false}  
};
