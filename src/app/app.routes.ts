import { Routes } from '@angular/router';
import { UserHomeComponent } from '@domains/users/pages/user-home/user-home.component';
import { LayoutComponent } from '@domains/shared/layouts/layout/layout.component';
import { UserAddComponent } from '@domains/users/pages/user-add/user-add.component';
import { HomeComponent } from '@domains/home/pages/home/home.component';
import { UserEditComponent } from '@domains/users/pages/user-edit/user-edit.component';
import { LoginComponent } from '@domains/auth/pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AuthLayoutComponent } from '@domains/shared/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserHomeComponent,
      },
      {
        path: 'users/add',
        component: UserAddComponent,
      },
      {
        path: 'users/:id/edit',
        component: UserEditComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
