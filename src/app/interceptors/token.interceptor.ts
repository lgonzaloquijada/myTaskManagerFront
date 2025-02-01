import {
  HttpContext,
  HttpContextToken,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => true);

export function skipToken() {
  return new HttpContext().set(CHECK_TOKEN, false);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TOKEN) === false) {
    return next(req);
  }

  const tokenService = inject(TokenService);
  const accessToken = tokenService.getToken();

  if (accessToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }
  return next(req);
};
