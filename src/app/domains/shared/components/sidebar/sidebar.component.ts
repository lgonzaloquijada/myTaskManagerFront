import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private appService = inject(AppService);
  sidebarOpen = this.appService.sidebarOpen;
}
