import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserTableComponent } from '@domains/users/components/user-table/user-table.component';

@Component({
  selector: 'app-user-home',
  imports: [UserTableComponent, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {
  constructor() {}
}
