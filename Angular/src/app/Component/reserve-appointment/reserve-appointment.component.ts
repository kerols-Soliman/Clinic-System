import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctor } from 'src/app/_Interface/IDoctor';
import { IDoctorscheduleFullData } from 'src/app/_Interface/IDoctorSchedule';
import { DoctorScheduleService } from 'src/app/_Services/doctor-schedule.service';
import { DoctorService } from 'src/app/_Services/doctor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/_Services/reservation.service';
import { IReservation } from 'src/app/_Interface/IReservation';

@Component({
  selector: 'app-reserve-appointment',
  templateUrl: './reserve-appointment.component.html',
  styleUrls: ['./reserve-appointment.component.scss']
})
export class ReserveAppointmentComponent implements OnInit {

  constructor(private _doctorScheduleService:DoctorScheduleService,private _route:Router,
    private _activateRoute:ActivatedRoute,private _fb:FormBuilder,
    private _doctorService:DoctorService
    ,private _reservationServices:ReservationService) { }

  doctorId:any;
  ScheduleId:any;
  doctor:IDoctor;
  doctorSchedule:IDoctorscheduleFullData;
  myFilter:any;
  day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saterday"]
  dateSelected:any;
  reservetion:IReservation[];
  newReservation:IReservation;
  isSuggestionScheduleSelected:boolean=false;
  slotNo:number;
  timeStart:Date;
  timeEnd:Date;
  pickerChange:boolean=false;  
  selectedScheduleStart:any;
  selectedScheduleEnd:any;


  ngOnInit(): void {
    this.doctorId=this._activateRoute.snapshot.paramMap.get('doctorId')
    this.ScheduleId=this._activateRoute.snapshot.paramMap.get('scheduleId')
    this._doctorService.GetDoctorById(this.doctorId).subscribe(data=>{
      this.doctor=data;
    })

    this._doctorScheduleService.GetById(this.ScheduleId).subscribe(data=>{
      this.doctorSchedule=data;
    })

    this.myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      let x=this.doctorSchedule.dayWork;
      return day == this.day.indexOf(x.toString());
    };
  }


  reserveForm=this._fb.group({
    patientName:['',Validators.required],
    phone:['',Validators.required],
    birthday:['',Validators.required],
    date:['',Validators.required]
  })


  spliteThescheduleTime(){
    this.timeStart=new Date("01-01-2007 "+this.doctorSchedule.from);
    this.timeEnd=new Date("01-01-2007 "+this.doctorSchedule.to);
    this.slotNo =(this.timeEnd.getHours()-this.timeStart.getHours())*2
  }

  addMinutes(time:Date,slot:number) {
    return new Date(time?.getTime()+ 30*60000*slot)
  }
  
  createRange(number:number){
    return new Array(number)
  }

  datePickerChanged(){   
    this._reservationServices.GetAllByDoctorRange(this.doctorId,this.getDateFormate(this.dateSelected),this.getDateFormate(this.dateSelected)).subscribe(data=>{
      this.reservetion =data;
    })
    this.getDateFormate(this.dateSelected)
    this.pickerChange=true;
    this.spliteThescheduleTime();
  }

  getDateFormate(date:Date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }


  selectedSchedule(time:any){
    this.isSuggestionScheduleSelected=true;
    this.selectedScheduleStart=time.toLocaleTimeString('it-IT').toString();
    this.selectedScheduleEnd=this.addMinutes(time,1).toLocaleTimeString('it-IT');
  }

  isDisableSlot(time:any){
    let result=false;
    this.reservetion?.forEach(element => {
      if(element.from==time.toLocaleTimeString('it-IT')){
        result=true
      }
    });
    return result;
  }

  save(){
    if(this.isSuggestionScheduleSelected){
      let dd = String(this.dateSelected.getDate()).padStart(2, '0');
      let mm = String(this.dateSelected.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = this.dateSelected.getFullYear();
      let dateSelected = yyyy + '-' + mm + '-' + dd;
  
      this.newReservation={
        patientName:this.formField.patientName.value,
        birthday:this.formField.birthday.value,
        dateReserve:dateSelected,
        doctorId:this.doctorId,
        phone:this.formField.phone.value,
        doctorscheduleId:this.doctorSchedule.id,
        from:this.selectedScheduleStart,
        to:this.selectedScheduleEnd,
      }
      this._reservationServices.Insert(this.newReservation).subscribe(data=>{
        history.back();
      })
    }
    else{
      alert("Select An Appointment To His Reservation")
    }
    
  }
  
  ConvertTime(time:any) {
    time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
 
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[3] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  get formField(){return this.reserveForm.controls}
}
