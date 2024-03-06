import { Component } from '@angular/core';
import { TableColumn, TableComponent } from "../table/table.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [TableComponent]
})
export class UserComponent {
  tableColumns: TableColumn[] = [
    { name: 'ID', dataField: 'id' },
    { name: 'FullName', dataField: 'fullname' },
    { name: 'Email', dataField: 'email' },
    { name: 'Password', dataField: 'password' }
  ];
  tableData: any[] = [];
}
