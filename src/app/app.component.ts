import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Component/header/header.component";
import { SidebarComponent } from "./Component/sidebar/sidebar.component";
import { SidebarService } from './Component/sidebar/SidebarService';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Comment } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./Component/login/login.component";
import { SignupComponent } from "./Component/signup/signup.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent, MatSidenavModule, MatToolbarModule, CommonModule, LoginComponent, SignupComponent]
})
export class AppComponent implements OnInit{
  showHeaderAndSidebar: boolean = true;


  constructor(private sidebarService: SidebarService,private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeaderAndSidebar = !this.isLoginPage();
      }
    });
  }
  toggleSidebar(): void {
    this.sidebarService.toggle();
  }
  isLoginPage(): any {
    return this.router.url === '/app-login';
  }
  isSignupPage(): boolean {
    return this.router.url === '/app-signup';
  }
}