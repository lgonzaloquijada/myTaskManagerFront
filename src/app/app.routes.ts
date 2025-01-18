import { Routes } from '@angular/router';
import { UserHomeComponent } from './domains/users/pages/user-home/user-home.component';
import { LayoutComponent } from './domains/shared/layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent,
      }
    ],
  },
];
