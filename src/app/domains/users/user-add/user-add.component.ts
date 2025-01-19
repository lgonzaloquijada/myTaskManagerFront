import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormComponent } from "@domains/users/components/user-form/user-form.component";

@Component({
  selector: 'app-user-add',
  imports: [UserFormComponent],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/users']);
  }
}
