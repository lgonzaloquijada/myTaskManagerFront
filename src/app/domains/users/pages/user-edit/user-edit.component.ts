import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserFormComponent } from '@domains/users/components/user-form/user-form.component';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-edit',
  imports: [UserFormComponent, MatIconModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnChanges {
  private router = inject(Router);
  private userService = inject(UserService);

  @Input() id?: number;
  user?: User;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && this.id) {
      this.userService.getUser(this.id).subscribe((user) => {
        this.user = user;
      });
    }
  }

  onUserSave(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => {
        alert('User updated');
        this.goBack();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
