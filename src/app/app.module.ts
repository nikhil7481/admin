import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './Component/Services/auth.service';
import { AuthGuard } from './Component/Services/auth.guard';
import { LoginComponent } from './Component/login/login.component';
import { HeaderComponent } from './Component/header/header.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { TableComponent } from './Component/table/table.component';
import { UserComponent } from './Component/user/user.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,CommonModule,FormsModule,ReactiveFormsModule,RouterModule,HeaderComponent
  ],
  providers:[AuthService,AuthGuard]
})
export class AppModule {
  constructor(){

  }
 }
