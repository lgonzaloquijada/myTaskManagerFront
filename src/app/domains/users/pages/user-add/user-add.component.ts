import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserFormComponent } from '@domains/users/components/user-form/user-form.component';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-add',
  imports: [UserFormComponent, MatIconModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  onUserSave(user: User) {
    this.userService.addUser(user).subscribe({
      next: () => {
        this.snackBar.open('User added successfully', 'Close', {
          duration: 2000,
        });
        this.goBack();
      },
      error: (error) => {
        this.snackBar.open('Error adding user', 'Close', {
          duration: 2000,
          panelClass: 'snack-bar-error',
        });
      },
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
