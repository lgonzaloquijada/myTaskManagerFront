import { Component, inject, OnInit } from '@angular/core';
import { UserTableComponent } from '@domains/users/components/user-table/user-table.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-home',
  imports: [UserTableComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent implements OnInit {
  private userService = inject(UserService);

  constructor() {}

  ngOnInit() {
    this.userService.fetchUsers();
  }

  addUser() {
    console.log('Add user');
  }
}
