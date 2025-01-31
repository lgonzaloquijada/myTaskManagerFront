import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { map } from 'rxjs';
import { TokenService } from '@services/token.service';
import { Profile } from '@models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private apiUrl = environment.apiUrl;
  public user: WritableSignal<Profile | null> = signal<Profile | null>(null);

  constructor() {}

  login(email: string, password: string) {
    return this.http
      .post<Profile>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response: Profile) => {
          this.setUser(response);
          return response;
        })
      );
  }

  private setUser(user: Profile) {
    this.user.set(user);
    this.tokenService.setToken(user.token || '');
  }
}
