import { Component, inject, WritableSignal } from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@domains/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-table',
  imports: [MatIconModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  users: WritableSignal<User[]> = this.userService.users;

  constructor() {}

  editUser(user: User) {
    console.log('Edit user');
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete user',
        message: `Are you sure you want to delete user ${user.email}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user).subscribe();
      }
    });
  }
}
