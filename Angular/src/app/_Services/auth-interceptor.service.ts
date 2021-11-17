import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const Token = localStorage.getItem("token");
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (Token && isApiUrl) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${Token}`                    
            }
        });
    }
    
    return next.handle(request);
}
}
