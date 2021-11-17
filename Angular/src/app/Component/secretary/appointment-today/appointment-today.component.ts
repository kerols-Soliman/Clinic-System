import { Component, OnInit } from '@angular/core';
import { IReservationWithDoctor } from 'src/app/_Interface/IReservation';
import { ReservationService } from 'src/app/_Services/reservation.service';

@Component({
  selector: 'app-appointment-today',
  templateUrl: './appointment-today.component.html',
  styleUrls: ['./appointment-today.component.scss']
})
export class AppointmentTodayComponent implements OnInit {
  day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saterday"]

  constructor(private _reserveServices:ReservationService) { }

  allAppointment:IReservationWithDoctor[];
  ngOnInit(): void {
    let dateToday=new Date().toISOString().split('T')[0];
    this._reserveServices.GetAllByDate(dateToday).subscribe(data=>{
      this.allAppointment=data;
    })
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

}
