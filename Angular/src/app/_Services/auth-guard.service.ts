import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router,
    private _authservices: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.canActivate(childRoute, state);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this._authservices.isLoggedIn()) {
      const userRole = this._authservices.getRole(); // user
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        alert("unauthorized Link");
        this._router.navigate(['/']);
        return false;
      }
      return true;
    }
    this._router.navigate(['/login'], { queryParams: { returnUrl: url } });
    return false;
  }
}
