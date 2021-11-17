import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IReservation, IReservationWithDoctor } from '../_Interface/IReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private _http:HttpClient) { }

  url=`${environment.apiUrl}/api/Reservation`

  GetAllByDate(date:string):Observable<IReservationWithDoctor[]>{
    return this._http.get<IReservationWithDoctor[]>(`${this.url}/secretary/${date}`).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }

  GetAllByDoctor(doctorId:number):Observable<IReservation[]>{
    return this._http.get<IReservation[]>(`${this.url}/doctor/${doctorId}`).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }

  GetAllByDoctorRange(doctorId:number,from:string,to:string):Observable<IReservation[]>{
    return this._http.get<IReservation[]>(`${this.url}/doctor/${doctorId}/${from}/${to}`).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }

  Insert(reserve:IReservation):Observable<any>{
    return this._http.post<any>(this.url,reserve).pipe(
      catchError((err)=>{return throwError(err.message||"An error occur")})
    )
  }

}
