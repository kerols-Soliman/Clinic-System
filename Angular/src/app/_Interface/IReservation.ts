export interface IReservation{
    patientName:string,
    phone:string,
    birthday:string,
    dateReserve:string,
    from:string,
    to:string,
    doctorId:number,
    doctorscheduleId:number        
}
export interface IReservationWithDoctor{
    patientName:string,
    phone:string,
    birthday:string,
    dateReserve:string,
    from:string,
    to:string,
    doctorFullName:string
}