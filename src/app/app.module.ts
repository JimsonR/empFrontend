import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFetchComponent } from './employee-fetch/employee-fetch.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AttendanceComponent } from './attendance/attendance.component';


@NgModule({
  declarations: [
    
    EmployeeComponent,
    EmployeeFetchComponent,
    PopupComponent,
    DashboardComponent,
    AttendanceComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    JsonPipe,
    MatSlideToggleModule
    
   
  ],
  providers: [
    provideClientHydration(),
      provideHttpClient(
        withFetch()
      ),
     
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
