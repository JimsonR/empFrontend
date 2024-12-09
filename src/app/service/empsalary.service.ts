import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpSalaryTableDTO } from '../entity/EmpSalaryTableDTO';
import { SalaryReqDTO } from '../class/SalaryReqDTO';
import { BehaviorSubject, catchError, interval, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpsalaryService {

  _url = "http://localhost:8080/salary"

   pg = 0

   pgSize = 10;

  private allEmpSal : any[] = [];

   allEmpSalSubject = new BehaviorSubject<any[]>(this.allEmpSal);

  constructor(private _http : HttpClient) { 
    interval(5000).subscribe(()=>{
     
      this.refreshEmployeeSal();
    })
  }

  setEmpSalary(sal : SalaryReqDTO): Observable<any>{

    const url = `${this._url}/empsalary`

   return this._http.post<any>(url,sal).pipe(catchError(this.errorHandler))

  }

  

  getAllEmpSalary(): Observable<EmpSalaryTableDTO[]>{

const url = `${this._url}/allempsal?pg=${this.pg}&size=${this.pgSize}`

    return this._http.get<EmpSalaryTableDTO[]>(url).pipe(catchError(this.errorHandler))



  }

  getAllEmpSalObservable(): Observable<any[]>{
    return this.allEmpSalSubject.asObservable();
  }



  errorHandler(error : HttpErrorResponse){
    return throwError(()=> error.message || "Server error")
  }


  refreshEmployeeSal(){
    const url = `${this._url}/allempsal?pg=${this.pg}&size=${this.pgSize}`;
    // const url = `${this._url}/all`;
    this._http.get<EmpSalaryTableDTO[]>(url).subscribe((data)=> {
      // console.log(data);
      
      const updateData = data.map((emp)=>{
        

        //Preserve editing state during refresh
        const existing = this.allEmpSal.find((e)=> e.empId === emp.empId);
        if (existing && emp.isEditing) {
          
       return{
        ...existing
       };
        }else{
          return {...emp , isEditing: false};
        }
      
      });

      if(JSON.stringify(this.allEmpSal) !== JSON.stringify(updateData) ){
        
        this.allEmpSal = updateData;
     
        this.allEmpSalSubject.next(this.allEmpSal);
      }
    


    })
  }



}
