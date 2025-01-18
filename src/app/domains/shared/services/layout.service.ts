import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sidebarOpen: WritableSignal<boolean> = signal(true);

  constructor() {}

  toogleSidebar() {
    this.sidebarOpen.update((prevState) => !prevState);
  }
}
