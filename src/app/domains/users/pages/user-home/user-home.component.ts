import { Component } from '@angular/core';
import { UserTableComponent } from "@domains/users/components/user-table/user-table.component";

@Component({
  selector: 'app-user-home',
  imports: [UserTableComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {
  constructor() {}

  addUser() {
    console.log('Add user');
  }
}
