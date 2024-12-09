import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeDTO } from '../class/EmployeDTO';
import { EmployeeserviceService } from '../service/employeeservice.service';
import { Employee } from '../entity/employee';
import { PopupComponent } from '../popup/popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { AttendanceComponent } from '../attendance/attendance.component';
import { EmpsalaryService } from '../service/empsalary.service';
import { SalaryReqDTO } from '../class/SalaryReqDTO';
import { EmpSalaryTableDTO } from '../entity/EmpSalaryTableDTO';

@Component({
  selector: 'app-employee-fetch',
  templateUrl: './employee-fetch.component.html',
  styleUrl: './employee-fetch.component.css'
})
export class EmployeeFetchComponent  implements OnInit {

  @ViewChild('popup') popup! : PopupComponent; // Reference to PopupComponent
  @ViewChild('attendance') attendance! : AttendanceComponent

  errorMsg: any;

  ngOnInit(): void {

    this.getEmpSalaryList()
  
    // this._empService.getEmployeesObservable().subscribe((data)=>{
    //   this.allEmps = data.map((emp)=>{
    //     console.log(data)
    //     const existing = this.allEmps.find((e)=>e.empId === emp.empId);
    //     if (existing && emp.isEditing) {
    //       return{
    //         ...existing,
    //       };
    //     }else{
    //       return {...emp, isEditing:false}
    //     }
    //   }); // sync with service

      
    // });

    this._empSalService.getAllEmpSalObservable().subscribe(
      (data)=>{
        this.allEmpSal = data.map((emp)=>{

          const existing = this.allEmpSal.find((e)=> e.empId === emp.empId);
          if(existing && emp.isEditing){
            return {
              ...existing
            };
          }else{
            return {...emp, isEditing:false}
          }

        })
      });





      this.getEmps(); // fetch initial employees data
    
  }

  // ngAfterViewInit():void{

   
  // }



  emp1 = new EmployeeDTO(2,"","",0.0,true);

  

  allEmps = [] as EmployeeDTO[];


  //Employee Sal

  allEmpSal = [] as EmpSalaryTableDTO[];

  getEmpSalaryList(){

    return this._empSalService.getAllEmpSalary().subscribe({
      next: (data)=>{
        console.log()
        this.allEmpSal = data.map((emp : EmpSalaryTableDTO)=>({
          ...emp, isEditing:false
        }));
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }


  //constructor
  constructor(
    private _empService : EmployeeserviceService , private _empSalService : EmpsalaryService
    , private snackBar : MatSnackBar){}

  getEmpDetails(emp : EmployeeDTO){
    console.log(this.emp1)
    // this.popup.emp = emp;

    this._empService.getEmployee(emp).subscribe({
      next: (response)=>{
        
        console.log('popup',response)
        this.popup.emp.empId = response.empId
        this.popup.emp.empName = response.empName
        this.popup.emp.empEmail = response.empEmail
        this.popup.emp.baseSalary = response.baseSalary
      },
      error:(err)=>{
        console.log(err)
      }
    
    })

    

    return;
  }
  
  //  visibility = false;

  getEmps(){
    return this._empService.allEmployees().subscribe({
      next: (data) => {
        // console.log(data);
        this.allEmps = data.map((emp: EmployeeDTO)=>({
          ...emp, isEditing:false
        }));
      }, error: error=> this.errorMsg = error.statustext
    });
  }

message : String= ""

  startEditing(emp : EmployeeDTO){
emp.isEditing = true;
  }

  saveDetails(emp : EmpSalaryTableDTO){

   const empReq = new EmployeeDTO(emp.empId,emp.empName,emp.empEmail)

   const monthYear = `${this.attendance.currentYear}-${this.attendance.currentMonth}-01`

   const salReq = new SalaryReqDTO(emp.empId,12.0,monthYear)

      empReq.isEditing = false; // stop editing
      emp.isEditing = false;

      this._empSalService.setEmpSalary(salReq).subscribe({
        next:(data)=>{

          // this.showPopup('save ','success')
          console.log(data)
          this._empSalService.refreshEmployeeSal()

        },error:(err)=>{
          console.log(err)
        }
      })

      this._empService.updateEmployee(emp).subscribe(
        {
          next:(response)=>{
            this.message = response;
            this.showPopup(response,'success');
            
            // console.log('Employee update', response);
            

            this._empSalService.refreshEmployeeSal(); // Refresh table after saving
            
          }
        ,
        error:(error)=>{
          console.error('Error updating employee',error)
        },
        });

        console.log("save",salReq)

        

  }

  deleteEmp(emp : EmployeeDTO){
    return this._empService.deleteEmployee(emp).subscribe({
     next:(response)=> {
        console.log(response),
        this.showPopup(response,'delete')
     },
     error: (err)=>{
      console.error("error",err)
     }

  }
)



  
  }

  //show the pupup with a message
    // private showPopup(message : string): void{
    //   if(this.popup){
    //     this.popup.message = message;
    //     this.popup.showPopup(message);
    //   }else{
    //     console.error("popup component is not intialized")
    //   }
    // }

    showPopup(message : string, type: 'success'|'error'|'delete'){
      this.snackBar.open(message, "Close",{
        duration:3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: type === 'success' ? 'snackbar-success': 'snackbar-error',
      })
    }

    pageEvent = 5;
    length = 100;
    pageSize =  10;
    pageIndex = 0;

    // paginator code
    // handlePageEvent(e : PageEvent) {
    //   this.pageEvent = e;
    //   this.length = e.length;
    //   this.pageSize = e.pageSize;
    //   console.log('handle page event')
    //   this.pageIndex = e.pageIndex;
    // }
    pageChangeEvent(event: PageEvent) {
      console.log("page event")
      console.log(event.pageIndex)
      // this._empService.pgSize = event.pageSize
      // this._empService.pgNo = event.pageIndex
      // this._empService.refreshEmployees()
      this._empSalService.pgSize = event.pageSize
      this._empSalService.pg = event.pageIndex
      this._empSalService.refreshEmployeeSal()
      // const offset = ((event.pageIndex + 1) - 1) * event.pageSize;

      // this.splicedData = this.requests.slice(offset).slice(0, event.pageSize);
    }


    // Attendance

    getEmpAttendance(emp : number){

      console.log(emp)

    this.attendance.empAttendancePerMonth.empId = emp;
    this.attendance.currentMonth = this.attendance.currentMonth
    this.attendance.changeMonth()
    return;
    }


}
