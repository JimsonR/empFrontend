import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, throwError } from 'rxjs';

import { AttendanceReqDTO } from '../class/attendanceReqDTO';
import { AttendanceDTO } from '../entity/AttendanceDTO';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor( private _http : HttpClient){}

  _url = "http://localhost:8080"

 saveAttendance(attendance: AttendanceReqDTO): Observable<AttendanceDTO>{

     const url = `${this._url}/monthlyattendance`

     return this._http.post<AttendanceDTO>(url,attendance).pipe(catchError(this.errorHandler))


 }

errorHandler(error: HttpErrorResponse){

  return throwError(()=>error.message||'server error')
}

getAttendancePerMonth(attendance : AttendanceReqDTO) : Observable<AttendanceDTO>{
  
  const url = `${this._url}/getmonthlyattendance`

  console.log("request",attendance.empId)

 const req = new HttpRequest('POST',url,attendance,{responseType:'json' as 'json'})

  return this._http.request<AttendanceDTO>(req).pipe(
    filter((event): event is HttpResponse<AttendanceDTO> => event instanceof HttpResponse),map((response)=>response.body as AttendanceDTO)
  )
}

 
}
