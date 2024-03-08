import { Routes,RouterModule } from '@angular/router';
import { HeaderComponent } from './Component/header/header.component';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { AuthGuard } from './Component/Services/auth.guard';
import { HomeComponent } from './Component/home/home.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { UserComponent } from './Component/user/user.component';
import { TableComponent } from './Component/table/table.component';


export const routes: Routes = [
   
    { path: '', redirectTo: '/app-login', pathMatch: 'full' }, // Redirect to login by default
    { path: 'app-login', component: LoginComponent },
    { path: 'app-signup', component: SignupComponent },
    { path: 'app-home', component: HomeComponent },
    { path: 'app-header', component: HeaderComponent },
    { path: 'app-sidebar', component: SidebarComponent },
    { path: 'app-user', component: UserComponent },
    {path:'app-table',component:TableComponent}
];
