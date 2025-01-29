import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private cookieService = inject(CookieService);
  private tokenName = 'taskManagerToken';

  constructor() {}

  getToken(): string {
    return this.cookieService.get(this.tokenName);
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenName, token);
  }

  deleteToken(): void {
    this.cookieService.delete(this.tokenName);
  }
}
