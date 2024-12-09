export class AddEmployeeDTO{
    constructor(
        public empName : String,
        public empEmail : String,
        public baseSalary? : number
    ){}
}