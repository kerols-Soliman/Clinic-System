import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authServices:AuthenticationService) { }

  ngOnInit(): void {
  }

  IsLogin(){
    return this._authServices.isLoggedIn()
  }
  LogOut(){
    this._authServices.logout()
  }

}
