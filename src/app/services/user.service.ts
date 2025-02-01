import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  users: WritableSignal<User[]> = signal([]);
  errorFetchingUsers: WritableSignal<boolean> = signal(false);

  constructor() {
    this.fetchUsers().subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/user`);
  }

  fetchUsers(): Observable<User[]> {
    return this.getUsers().pipe(
      tap((users) => {
        this.users.set(users);
        this.errorFetchingUsers.set(false);
      }),
      catchError((err) => {
        this.errorFetchingUsers.set(true);
        throw err;
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/user`, user).pipe(
      tap((user) => {
        this.users.update((users) => [...users, user]);
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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/user/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/user`, user).pipe(
      tap((user) => {
        this.users.update((users) =>
          users.map((u) => (u.id === user.id ? user : u))
        );
      })
    );
  }
}
