import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorRoleComponent } from './Component/doctor-role/doctor-role.component';
import { ShowAppointmentComponent } from './Component/doctor-role/show-appointment/show-appointment.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { ReserveAppointmentComponent } from './Component/reserve-appointment/reserve-appointment.component';
import { AppointmentTodayComponent } from './Component/secretary/appointment-today/appointment-today.component';
import { DoctorScheduleShowComponent } from './Component/secretary/doctor-schedule-show/doctor-schedule-show.component';
import { DoctorScheduleComponent } from './Component/secretary/doctor-schedule/doctor-schedule.component';
import { DoctorComponent } from './Component/secretary/doctor/doctor.component';
import { SecretaryComponent } from './Component/secretary/secretary.component';
import { AuthGuardService } from './_Services/auth-guard.service';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"reserve/:doctorId/:scheduleId",component:ReserveAppointmentComponent,canActivate:[AuthGuardService]},
  {path:"doctor",component:DoctorRoleComponent,
    children:[
      {path:"appointment",component:ShowAppointmentComponent},
    ]
  },
  {path:"regist",component:RegisterComponent},
  {path:"login",component:LoginComponent},

  {path:"seretary",component:SecretaryComponent,canActivate:[AuthGuardService],canActivateChild:[AuthGuardService]
    ,children:[
      {path:"allAppoitment",component:AppointmentTodayComponent},
      {path:"doctor",component:DoctorComponent},
      {path:"showDoctorSchedule/:id",component:DoctorScheduleShowComponent},
      {path:"DoctorSchedule/:id",component:DoctorScheduleComponent},
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
