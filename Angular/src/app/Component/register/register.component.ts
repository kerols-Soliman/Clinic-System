import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, IRegister } from 'src/app/_Interface/IRegister';
import { AuthenticationService } from 'src/app/_Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _fb:FormBuilder,private _router:Router,
    private _authServices:AuthenticationService) { }

  ngOnInit(): void {
  }

  registerForm:any=this._fb.group({
    username: ['',[Validators.required,Validators.pattern("[^' ']+")]],
    passwordHash: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]],
    confirmPassword: ['', Validators.required],
  });

  get formField(){return this.registerForm.controls}

  onSubmit(){
    let newRegist:IRegister={
      userName : this.formField.username.value,
      passwordHash:this.formField.passwordHash.value,
      confirmPassword:this.formField.confirmPassword.value,
    }
    console.log(newRegist);
    this._authServices.registerUser(newRegist).subscribe(data=>{
      let login:ILogin={
        userName:this.formField.username.value,
        passwordHash:this.formField.passwordHash.value
      }
      this._authServices.login(login).subscribe(data2=>{
        this._router.navigate([""]);
      })
    })
  }
}
