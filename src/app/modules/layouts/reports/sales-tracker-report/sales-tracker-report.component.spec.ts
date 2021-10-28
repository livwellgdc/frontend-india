import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrackerReportComponent } from './sales-tracker-report.component';

describe('SalesTrackerReportComponent', () => {
  let component: SalesTrackerReportComponent;
  let fixture: ComponentFixture<SalesTrackerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTrackerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
