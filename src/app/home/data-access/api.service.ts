import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private uploadAPI = "http://localhost:8080/users/upload";
  private baseURL = "http://localhost:8080/users?minSalary=0&maxSalary=4000&offset=0&limit=1000&sort=%2Bid"

  constructor(private http:HttpClient) { }

  uploadCSV(file:any):Observable<any>{
    const formData = new FormData();

    formData.append("file", file, file.name);

    return this.http.post(this.uploadAPI, formData).pipe(catchError(
      (err:any) =>{
        console.log(err.error.message);
        return of(err.error);
      }
    ));
  }

  getEmployee(minSalary:Number, maxSalary:Number):Observable<any>{
    if(minSalary >= 0 && maxSalary >= 0 && maxSalary>=minSalary)
    {
      console.log(minSalary);
      
      this.baseURL = `http://localhost:8080/users?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=0&limit=100&sort=%2Bid`;
    }
    return this.http.get(this.baseURL);
  }
}
