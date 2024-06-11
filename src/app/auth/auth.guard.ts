import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localToken = localStorage.getItem('authUser');
  if (localToken !== null) {
    return true;
  } else {
    router.navigate(['/login/']);
    return false;
  }
};
