import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../services/app.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLinkWithHref, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private appService = inject(AppService);
  private router = inject(Router);

  sidebarOpen = this.appService.sidebarOpen;
}
