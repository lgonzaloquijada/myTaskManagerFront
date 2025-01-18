import { Component, inject, WritableSignal } from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  private userService = inject(UserService);
  users: WritableSignal<User[]> = this.userService.users;

  constructor() {}

  editUser(user: User) {
    console.log('Edit user');
  }

  deleteUser(user: User) {
    console.log('Delete user');
  }
}
