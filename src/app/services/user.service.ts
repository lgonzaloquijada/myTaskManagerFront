import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@models/user.model';
import { firstValueFrom, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5122/api';

  users: WritableSignal<User[]> = signal([]);

  constructor() {
    this.fetchUsers();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/user`);
  }

  fetchUsers(): void {
    this.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/user`, user).pipe(
      tap((user) => {
        this.users.update((users) => [...users, user]);
        return user;
      })
    );
  }

  deleteUser(user: User): Observable<void> {
    return this.http.delete<void>(`${this.api}/user/${user.id}`).pipe(
      tap(() => {
        this.users.update((users) => users.filter((u) => u.id !== user.id));
      })
    );
  }
}
