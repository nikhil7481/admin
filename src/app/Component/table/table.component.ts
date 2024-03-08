import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-table',
  standalone:true,
  imports:[CommonModule,],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: User[] = [];
  @Output() edit: EventEmitter<User> = new EventEmitter<User>();
  @Output() delete: EventEmitter<User> = new EventEmitter<User>();
  displayedColumns: string[] = [];

  constructor() {
    this.displayedColumns = this.columns.map(column => column.dataField);
  }
  

  editRow(user: User) {
    this.edit.emit(user);
  }

  deleteRow(user: User) {
    this.delete.emit(user);
  }
}

export interface TableColumn {
  name: string;
  dataField: keyof User;
  // Add more properties as needed
}