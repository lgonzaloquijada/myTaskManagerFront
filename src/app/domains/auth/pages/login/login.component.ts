import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private autService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  errorText = signal('');
  loginForm = this.formBuilder.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {}

  submitLogin() {
    console.log('submitLogin');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.autService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe({
        next: () => {
          this.errorText.set('');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorText.set(error.error);
        },
      });
  }
}
