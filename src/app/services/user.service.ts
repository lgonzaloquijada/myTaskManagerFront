import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@models/user.model';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  users: WritableSignal<User[]> = signal([]);

  constructor() {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5122/api/user');
  }

  async fetchUsers() {
    let users = await firstValueFrom(this.getUsers());
    this.users.set(users);
  }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:5122/api/user', user).pipe(
      map((user) => {
        this.users.update((users) => [...users, user]);
        return user;
      })
    );
  }
}
