// user.component.ts (Angular component to display users)
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/user.model';
import { TableColumn, TableComponent } from '../table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone:true,
  imports:[TableComponent,HttpClientModule,CommonModule],
  providers:[AuthService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  tableColumns: TableColumn[] = [
    { name: 'ID', dataField: 'id' },
    { name: 'Name', dataField: 'fullname' },
    { name: 'Email', dataField: 'email' },
    {name:'PassWord',dataField:'password'}
    // Add more columns as needed
  ]; // Adjust values as needed

  users: User[] = [];

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (users: User[]) => {
        // Map each user object to an object with the expected properties
        this.users = users.map(user => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          password: user.password
        }));
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '250px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteUser(user: User) {
    this.authService.deleteUser(user.id).subscribe(
      () => {
        // Remove the deleted user from the local users array
        this.users = this.users.filter(u => u.id !== user.id);
        console.log('User deleted successfully:', user);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  
}

