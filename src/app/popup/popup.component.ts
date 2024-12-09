import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Employee } from '../entity/employee';
import { EmployeeDTO } from '../class/EmployeDTO';
import { EmployeeserviceService } from '../service/employeeservice.service';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent  implements OnInit{

emp = new EmployeeDTO(2,"","",0,true)

show : boolean = false;

  ngOnInit(): void {
    // this._empService.getEmployee(this.emp).subscribe({
    //   next: (response)=>{
        
    //     console.log('popup',response),
    //     this.emp = response
    //   },
    //   error:(err)=>{
    //     console.log(err)
    //   }
    
    // })
  }
  
  constructor(private _empService : EmployeeserviceService){}

// showEmp(){

// return this._empService.getEmployee(this.emp).subscribe({
//   next: (response)=>{
//     console.log(response),
//     this.emp = response
//   },
//   error:(err)=>{
//     console.log(err)
//   }

// })


// }
saveEmp(){
  console.log(this.emp)
  // const payload = {
  //   empId : this.emp.empId,
  //   empName : this.emp.empName,
  //   empEmail : this.emp.empEmail,
  //   baseSalary : this.emp.baseSalary
  // }
  return this._empService.updateEmployee(this.emp).subscribe({
    next:(data)=>{
      console.log(data)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
 



}
