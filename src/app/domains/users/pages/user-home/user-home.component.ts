import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserTableComponent } from '@domains/users/components/user-table/user-table.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-home',
  imports: [UserTableComponent, MatIconModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {}

  addUser() {
    this.router.navigate(['/users/add']);
  }
}
