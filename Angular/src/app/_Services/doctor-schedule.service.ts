import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDoctorSchedule, IDoctorscheduleFullData } from '../_Interface/IDoctorSchedule';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  constructor(private _http:HttpClient) { }

  url=`${environment.apiUrl}/api/Doctorschedule`;

  GetAllScheduleRelatedToDoctor(doctorId:number):Observable<IDoctorscheduleFullData[]>{
    return this._http.get<IDoctorscheduleFullData[]>(`${this.url}/doctorSchedule/${doctorId}`).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }

  GetById(scheduleId:number):Observable<IDoctorscheduleFullData>{
    return this._http.get<IDoctorscheduleFullData>(`${this.url}/${scheduleId}`).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }

  InsertListSchedule(scheduleList:IDoctorSchedule[]):Observable<IDoctorSchedule[]>{
    return this._http.post<IDoctorSchedule[]>(`${this.url}`,scheduleList).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }



}
