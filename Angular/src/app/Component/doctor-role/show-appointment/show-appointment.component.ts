import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReservation } from 'src/app/_Interface/IReservation';
import { ReservationService } from 'src/app/_Services/reservation.service';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.scss']
})
export class ShowAppointmentComponent implements OnInit {
  @ViewChild("closeModelBtn") closeModelBtn:any;
  

  constructor(private _activateRoute:ActivatedRoute,private _reserveServices:ReservationService) { }
  allReserve:IReservation[]
  doctorId:any;
  fromDate:any;
  toDate:any;
  IsDoctorIdEnterd:boolean=false;
  day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saterday"]



  loadData(doctorId:any){
    this.doctorId=doctorId;
    this._reserveServices.GetAllByDoctor(this.doctorId).subscribe(data=>{
      this.allReserve=data;
      this.IsDoctorIdEnterd=true;
    })
  }
  ngOnInit(): void {
  }

  getDate(date:any){
    return date.split('T')[0]
  }
  getDay(date:any){
    return this.day[new Date(date).getDay()]
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
  
  SpecificRange(){
    this._reserveServices.GetAllByDoctorRange(this.doctorId,this.fromDate,this.toDate).subscribe(data=>{
      this.allReserve=data;
      this.closeModelBtn.nativeElement.click();
    })
  }
}
