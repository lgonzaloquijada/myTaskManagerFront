import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let tokenService = inject(TokenService);
  let token = tokenService.getToken();

  if (token === null || token === '') {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
