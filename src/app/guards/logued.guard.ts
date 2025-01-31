import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export const loguedGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let tokenService = inject(TokenService);
  let token = tokenService.getToken();

  if (token !== null && token !== '') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
