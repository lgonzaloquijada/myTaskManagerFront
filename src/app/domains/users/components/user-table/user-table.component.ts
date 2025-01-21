import {
  AfterViewInit,
  Component,
  effect,
  inject,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@domains/shared/components/confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-user-table',
  imports: [
    MatIconModule,
    RouterLink,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements AfterViewInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  users: WritableSignal<User[]> = this.userService.users;
  errorFetchingUsers: WritableSignal<boolean> =
    this.userService.errorFetchingUsers;

  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor() {
    effect(() => {
      if (this.errorFetchingUsers()) {
        this.snackBar.open('Error fetching users', 'Dismiss', {
          duration: 2000,
          panelClass: 'snack-bar-error',
        });
      }
    });

    effect(() => {
      const users = this.userService.users();
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
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
