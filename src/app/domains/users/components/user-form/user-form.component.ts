import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatchValidator } from '@domains/shared/validators/match.validator';
import { ChangedOrSubmitedStateMatcher } from '@domains/shared/validators/changed-or-submited.state-matcher';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnChanges {
  private snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  matcher = new ChangedOrSubmitedStateMatcher();

  @Input() user?: User;
  @Output() userSave = new EventEmitter<User>();

  form = this.formBuilder.nonNullable.group(
    {
      name: new FormControl(this.user?.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      passwordRepeat: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      role: new FormControl('user', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      status: new FormControl('1', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: [MatchValidator('passwordRepeat', 'password')] }
  );

  constructor() {}

  ngOnInit() {}

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
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.email.setValue(this.user.email);
    this.form.controls.password.setValue(this.user.password);
    this.form.controls.passwordRepeat.setValue(this.user.password);
    this.form.controls.role.setValue(this.user.role);
    this.form.controls.status.setValue(this.user.is_active ? '1' : '0');
  }

  submit() {
    if (
      this.form.controls.password.value ===
      this.form.controls.passwordRepeat.value
    ) {
      const user: User = {
        id: this.user?.id,
        name: this.form.controls.name.value ?? '',
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        role: this.form.controls.role.value,
        is_active: this.form.controls.status.value === '1' ? true : false,
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
