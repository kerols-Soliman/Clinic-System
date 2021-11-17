import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IDoctor } from 'src/app/_Interface/IDoctor';
import { Days, IDoctorSchedule } from 'src/app/_Interface/IDoctorSchedule';
import { DoctorScheduleService } from 'src/app/_Services/doctor-schedule.service';
import { DoctorService } from 'src/app/_Services/doctor.service';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit {

  doctorId:any;
  doctorDetails:IDoctor;
  Days:any=['Saterday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
  daysWork:IDoctorSchedule[];


  constructor(private _activateRoute:ActivatedRoute,private _doctorService:DoctorService,
    private _doctorSchedule:DoctorScheduleService,private _fb:FormBuilder,
    private _router:Router) {
    
   }

  ngOnInit(): void {
    this.doctorId = this._activateRoute.snapshot.paramMap.get('id');
    this._doctorService.GetDoctorById(this.doctorId).subscribe(data=>{
      this.doctorDetails=data;
    });

    
    
  }

  IsSaterdayChecked:boolean=false;
  IsSundayChecked:boolean=false;
  IsMondayChecked:boolean=false;
  IsTuesdayChecked:boolean=false;
  IsWednesdayChecked:boolean=false;
  IsThursdayChecked:boolean=false;
  IsFridayChecked:boolean=false;


  SaterdayChanged(event:any){
    this.IsSaterdayChecked=false;
    if(event.target.checked){
      this.IsSaterdayChecked=true;
    }
  }
  SundayChanged(event:any){
    this.IsSundayChecked=false;
    if(event.target.checked){
      this.IsSundayChecked=true;
    }
  }
  MondayChanged(event:any){
    this.IsMondayChecked=false;
    if(event.target.checked){
      this.IsMondayChecked=true;
    }
  }
  TuesdayChanged(event:any){
    this.IsTuesdayChecked=false;
    if(event.target.checked){
      this.IsTuesdayChecked=true;
    }
  }
  WednesdayChanged(event:any){
    this.IsWednesdayChecked=false;
    if(event.target.checked){
      this.IsWednesdayChecked=true;
    }
  }
  ThursdayChanged(event:any){
    this.IsThursdayChecked=false;
    if(event.target.checked){
      this.IsThursdayChecked=true;
    }
  }
  FridayChanged(event:any){
    this.IsFridayChecked=false;
    if(event.target.checked){
      this.IsFridayChecked=true;
    }
  }

  
  SaterdayForm=this._fb.group({
    DayName:[this.Days[0]],
    To:[''],
    From:['']
  })
  SundayForm=this._fb.group({
    DayName:[this.Days[1]],
    To:[''],
    From:['']
  })
  MondayForm=this._fb.group({
    DayName:[this.Days[2]],
    To:[''],
    From:['']
  })
  TuesdayForm=this._fb.group({
    DayName:[this.Days[3]],
    To:[''],
    From:['']
  })
  WednesdayForm=this._fb.group({
    DayName:[this.Days[4]],
    To:[''],
    From:['']
  })
  ThursdayForm=this._fb.group({
    DayName:[this.Days[5]],
    To:[''],
    From:['']
  })
  FridayForm=this._fb.group({
    DayName:[this.Days[6]],
    To:[''],
    From:['']
  })




  get SaterdayFormField(){return this.SaterdayForm.controls;}
  get SundayFormField(){return this.SundayForm.controls;}
  get MondayFormField(){return this.MondayForm.controls;}
  get TuesdayFormField(){return this.TuesdayForm.controls;}
  get WednesdayFormField(){return this.WednesdayForm.controls;}
  get ThursdayFormField(){return this.ThursdayForm.controls;}
  get FridayFormField(){return this.FridayForm.controls;}


  save(){
    this.daysWork=[];
    if(this.IsSaterdayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.SaterdayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.SaterdayFormField.From.value,
        to:this.SaterdayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    if(this.IsSundayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.SundayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.SundayFormField.From.value,
        to:this.SundayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    if(this.IsMondayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.MondayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.MondayFormField.From.value,
        to:this.MondayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    if(this.IsTuesdayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.TuesdayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.TuesdayFormField.From.value,
        to:this.TuesdayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    if(this.IsWednesdayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.WednesdayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.WednesdayFormField.From.value,
        to:this.WednesdayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    if(this.IsThursdayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.ThursdayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.ThursdayFormField.From.value,
        to:this.ThursdayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    if(this.IsFridayChecked){
      let daywork:IDoctorSchedule={
        dayWork:this.FridayFormField.DayName.value,
        doctorId:this.doctorId,
        from:this.FridayFormField.From.value,
        to:this.FridayFormField.To.value
      }
      this.daysWork.push(daywork)
    }
    this._doctorSchedule.InsertListSchedule(this.daysWork).subscribe(data=>{
        this._router.navigate(["/seretary/showDoctorSchedule",this.doctorId]);
      })
    
  }
}
