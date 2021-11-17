import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { SecretaryComponent } from './Component/secretary/secretary.component';
import { FooterComponent } from './Component/footer/footer.component';
import { DoctorComponent } from './Component/secretary/doctor/doctor.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorScheduleComponent } from './Component/secretary/doctor-schedule/doctor-schedule.component';
import { DoctorScheduleShowComponent } from './Component/secretary/doctor-schedule-show/doctor-schedule-show.component';
import { HomeComponent } from './Component/home/home.component';
import { ReserveAppointmentComponent } from './Component/reserve-appointment/reserve-appointment.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorRoleComponent } from './Component/doctor-role/doctor-role.component';
import { ShowAppointmentComponent } from './Component/doctor-role/show-appointment/show-appointment.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';
import { AuthInterceptorService } from './_Services/auth-interceptor.service';
import { Header2Component } from './Component/header2/header2.component';
import { ChartModule } from 'angular2-chartjs';
import { AppointmentTodayComponent } from './Component/secretary/appointment-today/appointment-today.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SecretaryComponent,
    FooterComponent,
    DoctorComponent,
    DoctorScheduleComponent,
    DoctorScheduleShowComponent,
    HomeComponent,
    ReserveAppointmentComponent,
    DoctorRoleComponent,
    ShowAppointmentComponent,
    RegisterComponent,
    LoginComponent,
    Header2Component,
    AppointmentTodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ChartModule
  ],
  exports:[
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
