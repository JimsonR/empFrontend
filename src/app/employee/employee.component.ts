import { Component, OnInit } from '@angular/core';
import { AddEmployeeDTO } from '../class/AddEmployeeDTO';
import { EmployeeserviceService } from '../service/employeeservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  errorMsg = "";
  ngOnInit(): void {
      
  }

  
  

  emp = new AddEmployeeDTO("","")

response : String= ""



constructor(private _empService : EmployeeserviceService, private snackBar : MatSnackBar ){}

addEmp(){
  this._empService.addEmployee(this.emp).subscribe
              (data => {console.log('success' , data),
                this.response = data,
                this.showPopup(this.response as string,'success')
                this.emp ={empName:'',empEmail:'',baseSalary : 0};
              // this.empFetch.allEmps.push(data)
              // this.empFetch.allEmpsSubject.next(this.empFetch.allEmps);
              }
              // error => this.errorMsg=error.statustext
            )}

private showPopup(message:string , type : 'success'|'error'){
  return this.snackBar.open(message,"Close" ,{
    duration : 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass : type === 'success' ? 'snackbar-succcess' : 'snackbar-error',
  })

}

}
