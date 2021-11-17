import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILogin, IRegister } from '../_Interface/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http:HttpClient,private _router:Router) { }

  url=`${environment.apiUrl}/api​/Account​`
  registerUser(registerUser:IRegister):Observable<any>{
    return this._http.post<any>(`${environment.apiUrl}/register`, registerUser).pipe(catchError((err) => {
      return throwError(err || "Internal Server error contact site adminstarator");
      }
    ));
  }
  

  login(login:ILogin):Observable<any> {
    return this._http.post<any>(`${environment.apiUrl}/login`,login).pipe(map(res => {
            this.setSession(res);
        })
      );  
  }

  private setSession(authResult:any) {
    const expiresAt = authResult.expiration;
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this._router.navigate(['']);
  }
  public isLoggedIn() {
    if (localStorage.getItem('token')) {
        let token:any = localStorage.getItem('token');

        let jwtData = token.split('.')[1]

        let decodedJwtJsonData = window.atob(jwtData)

        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let expirationDateInMills = decodedJwtData.exp * 1000;

        let todayDateInMills = new Date().getTime();

        if (expirationDateInMills >= todayDateInMills)
            return true;

    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getRole(): string {
      if (localStorage.getItem('token')) {
          let token:any = localStorage.getItem('token');

          let jwtData = token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          return decodedJwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }
      return "No Role";
  }



}
