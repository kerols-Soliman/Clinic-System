import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDoctorFullData,IDoctor } from 'src/app/_Interface/IDoctor';
import { DoctorService } from 'src/app/_Services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  @ViewChild('addOrUpdateBtnReference') addOrUpdateBtnReference:any;

  constructor(private _doctorServices:DoctorService,private route:Router
    ,private _fb:FormBuilder) { }
  AllDoctor:IDoctorFullData[];
  ModalState:string;
  actionName:string;
  IdOfDoctorUpdate:number;

  ngOnInit(): void {    
    this._doctorServices.GetAllDoctor().subscribe(data=>
      this.AllDoctor=data)
  }

  newDoctorForm=this._fb.group({
    fullName:['',[Validators.required,Validators.minLength(3)]],
    Phone:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
    NationalId:['',[Validators.required,Validators.minLength(14),Validators.maxLength(14)]],
    TitleDegree:['',Validators.required]
  })
  

  changeModalState(inputValue:string,id:number){
    this.ModalState=inputValue;
    if(inputValue=="modify"){
      this.IdOfDoctorUpdate=id;
      this._doctorServices.GetDoctorById(id).subscribe(data=>{
        this.newDoctorForm.setValue({
          fullName:data.fullName,
          Phone:data.phone,
          NationalId:data.nationalId,
          TitleDegree:data.titleDegree
        })
      })
      
    }else{
      this.newDoctorForm.setValue({
        fullName:"",
        Phone:"",
        NationalId:"",
        TitleDegree:""
      })
    }
  }

  get formFields() { return this.newDoctorForm.controls; }

  add(){
    let newDoctor:IDoctor={
      fullName:this.formFields.fullName.value,
      nationalId:this.formFields.NationalId.value,
      phone:this.formFields.Phone.value,
      titleDegree:this.formFields.TitleDegree.value
    };
    this._doctorServices.InsertDoctor(newDoctor).subscribe(data=>{
      this.addOrUpdateBtnReference.nativeElement.click();
      location.reload();
    })     
  }
  

  Edit(){
    let newDoctor:IDoctorFullData={
      id:this.IdOfDoctorUpdate,
      fullName:this.formFields.fullName.value,
      nationalId:this.formFields.NationalId.value,
      phone:this.formFields.Phone.value,
      titleDegree:this.formFields.TitleDegree.value
    };
    this._doctorServices.UpdateDoctor(newDoctor).subscribe(data=>{
      this.addOrUpdateBtnReference.nativeElement.click();
      location.reload();
    })
  }
  delete(id:number){
    this._doctorServices.Delete(id).subscribe(data=>{
      location.reload();
    })
  }
  appointment(id:number){
    this.route.navigate(["/seretary/showDoctorSchedule",id])
  }
}
