export class EmployeeDTO{
    constructor(

   public  empId : number,
   public empName : String,
    public empEmail : String,
    public baseSalary?: number,
    public isEditing : boolean = false

    ){
    //    this.isEditing = true;
    }
}