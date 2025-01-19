import {
  Component,
  effect,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@domains/shared/components/confirm-dialog/confirm-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-user-table',
  imports: [MatIconModule, RouterLink, MatChipsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  users: WritableSignal<User[]> = this.userService.users;
  errorFetchingUsers: WritableSignal<boolean> =
    this.userService.errorFetchingUsers;

  constructor() {
    effect(() => {
      console.log('error fetching users changed');
      if (this.errorFetchingUsers()) {
        this.snackBar.open('Error fetching users', 'Dismiss', {
          duration: 2000,
          panelClass: 'snack-bar-error',
        });
      }
    });

    effect(() => {
      const users = this.userService.users();
      console.log('users changed');
    });
  }

  ngOnInit(): void {}

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
        this.userService.deleteUser(user).subscribe({
          next: () => {
            this.snackBar.open('User deleted', 'Dismiss', {
              duration: 2000,
            });
          },
          error: (err) => {
            this.snackBar.open('Error deleting user', 'Dismiss', {
              duration: 2000,
              panelClass: 'snack-bar-error',
            });
          },
        });
      }
    });
  }
}
