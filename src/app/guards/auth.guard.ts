import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let tokenService = inject(TokenService);
  if (tokenService.getToken() === null) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
