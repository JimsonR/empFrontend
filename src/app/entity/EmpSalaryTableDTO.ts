import { Employee } from "./employee"


export interface EmpSalaryTableDTO{

    id : number,
    empId: number,
    empName : string,
    empEmail : string,
    presentGrossSalary : number,
    employeeShare : number,
    totalEmployerShare : number,
    netSalary : number,
    lastMonthPfDue : number,
    total : number,
    isEditing : boolean
    // employee : Employee,


}