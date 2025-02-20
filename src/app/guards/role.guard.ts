import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const role = route.data['role']
  console.log('role:', role)
  if (role === 'ADMIN') {return true;}
  else {return false;}
};
