import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  emailCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  passwordCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  passwordRepeatCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  roleCtrl = new FormControl('user', {
    nonNullable: true,
    validators: [Validators.required],
  });
  statusCtrl = new FormControl('1', {
    nonNullable: true,
    validators: [Validators.required],
  });

  submit() {
    this.nameCtrl.markAsTouched();
    if (this.passwordCtrl.value === this.passwordRepeatCtrl.value) {
      let user: User = {
        name: this.nameCtrl.value,
        email: this.emailCtrl.value,
        password: this.passwordCtrl.value,
        role: this.roleCtrl.value,
        is_active: this.statusCtrl.value === '1' ? true : false,
      };
      this.userService.addUser(user).subscribe({
        next: () => {
          alert('User added successfully');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          alert('Error adding user');
        },
      });
    }
    return false;
  }
}
