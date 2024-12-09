import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFetchComponent } from './employee-fetch/employee-fetch.component';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopupComponent } from './popup/popup.component';
import { AttendanceComponent } from './attendance/attendance.component';

const routes: Routes = [
  {path: '',redirectTo:'/attendance',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'getEmp', component:EmployeeFetchComponent},
  {path: 'addEmp', component:EmployeeComponent},
  {path: 'popup', component:PopupComponent},
  {path:'attendance', component:AttendanceComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
