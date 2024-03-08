import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from './SidebarService';
import { AuthService } from '../Services/auth.service';
import { TableComponent } from '../table/table.component';
import { UserComponent } from '../user/user.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FlexLayoutModule, MatIconModule, MatToolbarModule, CommonModule, MatSidenavModule, MatListModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public sidebarService: SidebarService,private router:Router)  { }

  get isOpen$(): any {
    return this.sidebarService.isOpen$;
  }

  
}

