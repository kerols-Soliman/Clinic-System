import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/_Interface/IRegister';
import { AuthenticationService } from 'src/app/_Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _fb:FormBuilder,private _router:Router
    ,private _authServices:AuthenticationService) { }

  ngOnInit(): void {
  }
  loginForm:any=this._fb.group({
    username: ['',Validators.required],
    passwordHash: ['',Validators.required],
  });

  get formField(){return this.loginForm.controls}

  onSubmit(){
    let login:ILogin={
      userName : this.formField.username.value,
      passwordHash:this.formField.passwordHash.value,
    }
    console.log(login);
    this._authServices.login(login).subscribe(data=>{
      this._router.navigate([""]);
    })
  }
}
