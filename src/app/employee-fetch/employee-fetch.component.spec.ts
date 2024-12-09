import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFetchComponent } from './employee-fetch.component';

describe('EmployeeFetchComponent', () => {
  let component: EmployeeFetchComponent;
  let fixture: ComponentFixture<EmployeeFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeFetchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
