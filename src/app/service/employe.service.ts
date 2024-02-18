import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://your-backend-api-url';

  constructor(private http: HttpClient) {}

  createEmployee(employeeData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employeeData);
  }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees/${id}`);
  }

  updateEmployee(id:string, updatedData:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${id}`, updatedData);
  }

  deleteEmployee(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employees/${id}`);
  }
}
