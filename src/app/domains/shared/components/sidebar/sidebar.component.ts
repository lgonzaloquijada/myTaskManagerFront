import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private appService = inject(AppService);
  private router = inject(Router);

  sidebarOpen = this.appService.sidebarOpen;

  goToUsers() {
    this.router.navigate(['/users']);
  }
}
