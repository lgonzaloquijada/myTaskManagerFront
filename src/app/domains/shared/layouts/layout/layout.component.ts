import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../services/app.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private appService = inject(AppService);
  sidebarOpen = this.appService.sidebarOpen;

  toogleSideBar() {
    this.appService.toogleSidebar();
  }
}
