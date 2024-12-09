import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, interval, map, Observable, tap, throwError } from 'rxjs';
import { AddEmployeeDTO } from '../class/AddEmployeeDTO';
import { EmployeeDTO } from '../class/EmployeDTO';
import { Employee } from '../entity/employee';
import { employeeCast } from '../entity/employeeCast';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  private allEmps: any[] = [];

  allEmpsSubject = new BehaviorSubject<any[]>(this.allEmps);

  _url = "http://localhost:8080"

  pgNo = 0;

  pgSize = 10;

  constructor(private _http : HttpClient) {
    interval(5000).subscribe(()=>{
     
      this.refreshEmployees();
    })
   }

      getEmployeesObservable(): Observable<any[]>{
        return this.allEmpsSubject.asObservable();
      }


        getEmployee(emp : Employee): Observable<employeeCast>{

          const url = `${this._url}/details`
          

          return this._http.post<employeeCast>(url,emp).pipe(catchError(this.errorHandler));
        }

        errorHandler(error : HttpErrorResponse){
          return throwError(()=> error.message || "Server Error") 
        }

        addEmployee(emp : AddEmployeeDTO): Observable<string> {

          const url = `${this._url}/addEmp`

          

          return this._http.post<any>(url,emp,{responseType: 'text' as 'json'}).pipe(catchError(this.errorHandler),
        tap(()=>{
          this.refreshEmployees();
        }));

        }

        allEmployees(): Observable<any>{

          const url = `${this._url}/allp?pgNo=${this.pgNo}&pgSize=${this.pgSize}`;

          return this._http.get<Employee[]>(url).pipe(catchError(this.errorHandler))
        }

        refreshEmployees(){
          const url = `${this._url}/allp?pgNo=${this.pgNo}&pgSize=${this.pgSize}`;
          // const url = `${this._url}/all`;
          this._http.get<EmployeeDTO[]>(url).subscribe((data)=> {
            // console.log(data);
            
            const updateData = data.map((emp)=>{
              

              //Preserve editing state during refresh
              const existing = this.allEmps.find((e)=> e.empId === emp.empId);
              if (existing && emp.isEditing) {
                
             return{
              ...existing
             };
              }else{
                return {...emp , isEditing: false};
              }
            
            });

            if(JSON.stringify(this.allEmps) !== JSON.stringify(updateData) ){
              
              this.allEmps = updateData;
           
              this.allEmpsSubject.next(this.allEmps);
            }
          


          })
        }

        updateEmployee(emp : EmployeeDTO) :Observable<string>{

          const payload = {
            empId:emp.empId,
            empName: emp.empName,
            empEmail: emp.empEmail,
            baseSalary : emp.baseSalary
          }

          const url = `${this._url}/details`
          console.log(emp)

          return this._http
          .put<string>(url,payload, {responseType: 'text' as 'json'})
          .pipe(catchError(this.errorHandler))

        }

        
        deleteEmployee(emp : EmployeeDTO): Observable<string>{

          const url = `${this._url}/details`

          const req = new HttpRequest('DELETE', url, emp,{
            responseType: 'text' as 'json',
          })

          return this._http.request<string>(req).pipe(
            filter((event): event is HttpResponse<string> => event instanceof HttpResponse ),
            map((response) => response.body as string)
          );

        }



}
