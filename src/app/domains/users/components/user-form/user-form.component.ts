import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  private snackBar = inject(MatSnackBar);

  @Input() user?: User;
  @Output() userSave = new EventEmitter<User>();

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.updateForm();
    }
  }

  updateForm() {
    if (!this.user) {
      this.user = {
        name: '',
        email: '',
        password: '',
        role: 'user',
        is_active: true,
      };
    }
    this.nameCtrl.setValue(this.user.name);
    this.emailCtrl.setValue(this.user.email);
    this.passwordCtrl.setValue(this.user.password);
    this.passwordRepeatCtrl.setValue(this.user.password);
    this.roleCtrl.setValue(this.user.role);
    this.statusCtrl.setValue(this.user.is_active ? '1' : '0');
  }

  submit() {
    if (this.passwordCtrl.value === this.passwordRepeatCtrl.value) {
      const user = {
        id: this.user?.id,
        name: this.nameCtrl.value,
        email: this.emailCtrl.value,
        password: this.passwordCtrl.value,
        role: this.roleCtrl.value,
        is_active: this.statusCtrl.value === '1' ? true : false,
      };
      this.userSave.emit(user);
    } else {
      this.snackBar.open('Passwords do not match', 'Close', {
        duration: 2000,
        panelClass: 'snack-bar-error',
      });
    }
    return false;
  }
}
