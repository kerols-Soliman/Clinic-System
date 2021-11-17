import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { IDoctor, IDoctorFullData, IDoctorWithSchedule } from '../_Interface/IDoctor';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  //constructor(private http:HttpClient) { }
  constructor(private _http:HttpClient) { }


  url = `${environment.apiUrl}/api/doctor/`

  GetAllDoctor():Observable<IDoctorFullData[]>{
    return this._http.get<IDoctorFullData[]>(this.url).pipe(catchError((err)=>
    {
      return throwError(err.message || "An error occur");
    }))
  };

  GetDoctorById(id:number):Observable<IDoctor>{
    return this._http.get<IDoctor>(`${this.url}${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message || "An error occur");
    }))
  }

  GetAllDoctorWithHisSchedule():Observable<IDoctorWithSchedule[]>{
    return this._http.get<IDoctorWithSchedule[]>(`${this.url}withSchedule`).pipe(catchError((err)=>
    {
      return throwError(err.message || "An error occur");
    }))
  }

  InsertDoctor(doctor:IDoctor):Observable<IDoctor>{
    return this._http.post<IDoctor>(this.url,doctor).pipe(catchError((err)=>
    {
      return throwError(err.message || "An error occur");
    }))
  }

  UpdateDoctor(doctor:IDoctor):Observable<any>{
    return this._http.put<any>(this.url,doctor).pipe(catchError((err)=>
    {
      return throwError(err.message || "An error occur");
    }))
  }

  Delete(id:number):Observable<any>{
    return this._http.delete<any>(`${this.url}${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message || "An error occur");
    }))
  }
  
  



}
