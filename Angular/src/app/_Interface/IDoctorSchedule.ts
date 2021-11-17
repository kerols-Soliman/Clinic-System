export enum Days{
    Saterday,Sunday,Monday,Tuesday,
    Wednesday,Thursday,Friday
}
export interface IDoctorSchedule{
    doctorId:number,
    dayWork:Days,
    from:string,
    to:string
}

export interface IDoctorscheduleFullData{
    id:number,
    doctorId:number,
    dayWork:Days,
    from:string,
    to:string
}

export interface IDoctorScheduleWithDoctor{
    id:number,
    doctorId:number,
    doctorFullName:string,
    dayWork:Days,
    from:string,
    to:string
}