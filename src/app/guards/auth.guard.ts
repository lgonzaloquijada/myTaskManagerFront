import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (true) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
