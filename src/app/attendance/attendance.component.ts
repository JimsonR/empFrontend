import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AttendanceReqDTO } from '../class/attendanceReqDTO';
import { AttendanceDTO } from '../entity/AttendanceDTO';
import { AttendanceService } from '../service/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit{

  currentMonth: number = new Date().getMonth() + 1 ; // Current month (0 = January, 11 = December)
  currentYear: number = new Date().getFullYear(); // Current year
  daysInMonth: number = 0; // Number of days in the month
  startDay: number = new Date(this.currentYear, this.currentMonth - 1, 1).getDay() // Starting day of the week (0 = Sunday, 6 = Saturday)
  weeks: number[][] = []; // Array to hold the calendar weeks

   empAttendancePerMonth : AttendanceReqDTO = new AttendanceReqDTO(2);

   //req obj
   id : any = 0;
   mYear : string = ""
  
   month : {[key : string] : string}= {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  sortMonths = (a: { key: string; value: string }, b: { key: string; value: string }) =>
    parseInt(a.key, 10) - parseInt(b.key, 10);

  years: number[] = [];

  ngOnInit(): void {

    const currentYear = new Date().getFullYear();
    for(let i = currentYear - 3 ; i <= currentYear + 3; i++){
      this.years.push(i);
    }

    this.id = this.empAttendancePerMonth.empId

    this.setMonth(this.currentYear, this.currentMonth); // Initialize with the current month

    
    this.empAttendancePerMonth.monthYear = `${this.currentYear}-${this.currentMonth}-01`;
    this.mYear = this.empAttendancePerMonth.monthYear
    this._attendanceService.getAttendancePerMonth(this.empAttendancePerMonth).subscribe({
      next: (data)=>{
       
        this.empAttendancePerMonth = data;
        // console.log(data)

      },error:(err)=>{
console.log(err)
      }
    });
  }

  /**
   * Set the calendar data for a given month and year.
   * @param year The year of the calendar.
   * @param month The month of the calendar (0 = January, 11 = December).
   */
  setMonth(year: number, month: number): void {
    const zeroBasedMonth = month - 1

    this.daysInMonth = new Date(year, zeroBasedMonth + 1, 0).getDate(); // Get days in the month
    this.startDay = new Date(year, zeroBasedMonth, 1).getDay(); // Get the start day of the month
    this.generateCalendar(this.daysInMonth, this.startDay);
  }

  /**
   * Generate the calendar structure based on total days and the start day.
   * @param days Total number of days in the month.
   * @param startDay The starting day of the week (0 = Sunday, 6 = Saturday).
   */
  generateCalendar(days: number, startDay: number): void {
    let day = 1;
    const totalSlots = Math.ceil((days + startDay) / 7) * 7; // Total slots in the grid
    this.weeks = [];

    for (let i = 0; i < totalSlots; i++) {
      if (i % 7 === 0) {
        this.weeks.push([]); // Start a new week
      }

      // Add a day or leave it blank
      this.weeks[this.weeks.length - 1].push(i >= startDay && day <= days ? day++ : -1);
      this.cdr.detectChanges()
    }
  }

  /**
   * Navigate to the previous month.
   */
  previousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.setMonth(this.currentYear, this.currentMonth);
  }

  /**
   * Navigate to the next month.
   */
  nextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.setMonth(this.currentYear, this.currentMonth);
  }



  constructor(private _attendanceService: AttendanceService ,private snackbar : MatSnackBar , private cdr : ChangeDetectorRef){}


  saveAttendance(){
    console.log(
      "Present",this.presentDays
    )
    this.empAttendancePerMonth.totalDaysPresentPerMonth = this.getDaysPresent();
    return this._attendanceService.saveAttendance(this.empAttendancePerMonth).subscribe({
      next:(data)=>{
        console.log(data)
        this.empAttendancePerMonth = data;
        this.showPopup("Attendance Saved Succesfully", 'success');
       

      },error:(err)=>{         
      console.log(err)
      }
    }
    )
  }
presentDays =  this.getDaysPresent();
  updateAttendance(day: number, attendanceType: string|null): void{
    if(day > 0 &&  attendanceType){
    
      const dayField = `day${day}`;

      (this.empAttendancePerMonth as any)[dayField] = attendanceType;
      
      // this.empAttendancePerMonth.empId=  this.id
      // this.empAttendancePerMonth.monthYear = this.mYear

      console.log(`Attendance for day ${day} to: ${attendanceType}`);
      console.log('Updated Attendance Object:', this.empAttendancePerMonth);
    }
  }

  showPopup(message : string, type: 'success'|'error'|'delete'){
    this.snackbar.open(message, "Close",{
      duration:3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? 'snackbar-success': 'snackbar-error',
    })
  }


  getDaysPresent(): number{

    let daysPresent = 0;

    for(let day = 1 ; day <= this.daysInMonth ; day++){
      const dayField = `day${day}`
      if((this.empAttendancePerMonth as any)[dayField]==='Present'){
        daysPresent++
      }
    }
return daysPresent;
  }
  

  changeMonth(){

   const month = parseInt(this.currentMonth.toString(), 10)



   this.setMonth(this.currentYear, month)

   
  // this.empAttendancePerMonth.empId = this.id
   this.empAttendancePerMonth.monthYear = `${this.currentYear}-${month.toString().padStart(2,'0')}-01`;
   console.log(this.empAttendancePerMonth.monthYear)
    console.log("update obj",this.empAttendancePerMonth)
   this._attendanceService.getAttendancePerMonth(this.empAttendancePerMonth).subscribe({
    next : (data)=>
      {
        if(data){
          console.log("response for update",data)
      this.empAttendancePerMonth = { ...this.empAttendancePerMonth , ...data}
      // this.ngOnInit()
      
        }else{
          console.warn("No attendance found for the selected month. Resetting attendance fields.")
          this.resetAttendanceFields()
        
        }
        this.generateCalendar(this.daysInMonth,this.startDay)
      
    },
    error:(err)=>{
      console.log(err)
      this.resetAttendanceFields()
      this.generateCalendar(this.daysInMonth,this.startDay)
    }
   })

  }

  resetAttendanceFields(){

    for (let i = 0; i <= 31 ; i++) {
      
      this.empAttendancePerMonth[`day${i}`] = null
      
      
    

  }

  this.empAttendancePerMonth.totalDaysPresentPerMonth = 0;
  this.empAttendancePerMonth.monthYear = `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}-01`; // Update the month

  }
}
