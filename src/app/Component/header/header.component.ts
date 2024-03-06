import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarService } from '../sidebar/SidebarService';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,FlexLayoutModule,MatSidenavModule],
 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private sidebarService: SidebarService) { }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }
}
