import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  public user: WritableSignal<User | null> = signal<User | null>(null);

  constructor() {}

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response: User) => {
          localStorage.setItem('token', response.token || '');
          return response;
        })
      );
  }
}
