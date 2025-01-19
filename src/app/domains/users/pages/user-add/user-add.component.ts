import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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

  onUserSave(user: User) {
    this.userService.addUser(user).subscribe({
      next: () => {
        alert('User added');
        this.goBack();
      },
      error: (error) => {
        console.error('Error adding user', error);
      },
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
