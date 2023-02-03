import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../data-access/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  minSalary:Number = 0;
  maxSalary:Number = 100000;

  constructor(private apiService:ApiService){}

  displayedColumns: string[] = ['id', 'name', 'login', 'salary'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void{
    this.getEmployeeList();
  }

  getEmployeeList(): void{

    this.apiService.getEmployee(this.minSalary, this.maxSalary).subscribe(
      (employeeList) =>{
        this.dataSource = new MatTableDataSource(employeeList.results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(employeeList);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
