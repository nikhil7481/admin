import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; // If you want to use icons for search
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-table',
  standalone:true,
  imports:[MatTableModule,CommonModule,MatSortModule,MatFormFieldModule,MatPaginatorModule, MatInputModule,
    MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() isPaginator: boolean = false; // New input property for paginator
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.displayedColumns = this.columns.map(column => column.dataField);
    this.dataSource = new MatTableDataSource(this.data);
  }
  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    } else {
      console.error('MatSort instance not found for column: ', this.displayedColumns);
    }
    if (this.isPaginator && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  applyFilter(column: string, event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      if (!filter) return true; // Show all rows if filter is empty
      const columnValue = data[column];
      if (typeof columnValue === 'string') {
        return columnValue.toLowerCase().includes(filter);
      } else if (typeof columnValue === 'number' || typeof columnValue === 'boolean') {
        return columnValue.toString().toLowerCase().includes(filter);
      }
      return false; // Return false for other data types
    };
    this.dataSource.filter = value;
  }
  clearFilter() {
    this.dataSource.filterPredicate = null as any;
    this.dataSource.filter = '';
  }
}
export interface TableColumn {
  name: string;
  dataField: string;
  isSortable?: boolean;
  // Add more properties as needed
}