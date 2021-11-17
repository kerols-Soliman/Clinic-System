import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDoctorWithSchedule } from 'src/app/_Interface/IDoctor';
import { DoctorService } from 'src/app/_Services/doctor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _doctorServices:DoctorService,private _route:Router) { }
  allDoctor:IDoctorWithSchedule[];
  filteredDoctor:IDoctorWithSchedule[];
  ngOnInit(): void {
    this.getAllDoctorWithSchedule();
  }
  getAllDoctorWithSchedule(){
    this._doctorServices.GetAllDoctorWithHisSchedule().subscribe(data=>{
      this.allDoctor=data;
      this.filteredDoctor=data;
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

  reserve(doctorId:number,scheduleId:number){
    console.log(doctorId,scheduleId)
    this._route.navigate(["/reserve",doctorId,scheduleId])
  }


  onSearchChange(text:any){
    if(text.target.value==""){
      this.filteredDoctor=this.allDoctor;
    }
    else{
      this.filteredDoctor=this.allDoctor.filter(t=>t.fullName.toLowerCase().includes(text.target.value));
    }
    
  }
}
