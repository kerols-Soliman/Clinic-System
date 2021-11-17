import { IDoctorscheduleFullData } from "./IDoctorSchedule";

export interface IDoctorFullData{
    id:number,
    fullName:string,
    phone:string,
    nationalId:string,
    titleDegree:string
};
export interface IDoctor{
    fullName:string,
    phone:string,
    nationalId:string,
    titleDegree:string
}
export interface IDoctorWithSchedule{
    id:number,
    fullName:string,
    phone:string,
    nationalId:string,
    titleDegree:string,
    doctorschedules:IDoctorscheduleFullData[]
}