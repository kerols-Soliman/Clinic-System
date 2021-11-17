import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctor } from 'src/app/_Interface/IDoctor';
import { IDoctorscheduleFullData } from 'src/app/_Interface/IDoctorSchedule';
import { DoctorScheduleService } from 'src/app/_Services/doctor-schedule.service';
import { DoctorService } from 'src/app/_Services/doctor.service';

@Component({
  selector: 'app-doctor-schedule-show',
  templateUrl: './doctor-schedule-show.component.html',
  styleUrls: ['./doctor-schedule-show.component.scss']
})
export class DoctorScheduleShowComponent implements OnInit {

  constructor(private _activateRoute:ActivatedRoute,private _doctorService:DoctorService,
    private _doctorSchedule:DoctorScheduleService,private _router:Router) { }

  doctorId:any;
  doctorShedule:IDoctorscheduleFullData[];
  doctorDetails:IDoctor;

  ngOnInit(): void {
    this.doctorId =this._activateRoute.snapshot.paramMap.get('id');
    this._doctorService.GetDoctorById(this.doctorId).subscribe(data=>{
      this.doctorDetails=data;
    })
    this._doctorSchedule.GetAllScheduleRelatedToDoctor(this.doctorId).subscribe(data=>{
      this.doctorShedule=data;
    })
  }

  ConvertTime(time:any) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
 
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[3] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  changeSchedule(){
    this._router.navigate(["/seretary/DoctorSchedule",this.doctorId]);
  }
}
