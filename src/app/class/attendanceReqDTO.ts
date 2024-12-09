export class AttendanceReqDTO{
   [key : string] : any; // Index signature to allow dynamic string keys
   constructor(
    public empId ?: number , 
    public monthYear?: string | null,
    public day1?: string | null  ,
    public day2?: string | null  ,
    public day3?: string | null  ,
    public day4?: string | null  ,
    public day5?: string | null  ,
    public day6?: string | null  ,
    public day7?: string | null  ,
    public day8?: string | null  ,
    public day9?: string | null  ,
    public day10?: string | null  ,
    public day11?: string | null  ,
    public day12?: string | null  ,
    public day13?: string | null  ,
    public day14?: string | null  ,
    public day15?: string | null  ,
    public day16?: string | null  ,
    public day17?: string | null  ,
    public day18?: string | null  ,
    public day19?: string | null  ,
    public day20?: string | null  ,
    public day21?: string | null  ,
    public day22?: string | null  ,
    public day23?: string | null  ,
    public day24?: string | null  ,
    public day25?: string | null  ,
    public day26?: string | null  ,
    public day27?: string | null  ,
    public day28?: string | null  ,
    public day29?: string | null  ,
    public day30?: string | null  ,
    public day31?: string | null  ,
    public totalDaysPresentPerMonth? : number 
   )
   {
      this.empId = empId;
      this.monthYear = '';
      this.totalDaysPresentPerMonth = 0;
  
      // Initialize attendance fields for all days in a month
      for (let day = 1; day <= 31; day++) {
        this[`day${day}`] = null;
      }
   }

}