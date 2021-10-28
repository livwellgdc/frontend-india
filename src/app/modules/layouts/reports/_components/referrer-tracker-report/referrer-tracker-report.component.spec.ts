import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerTrackerReportComponent } from './referrer-tracker-report.component';

describe('ReferrerTrackerReportComponent', () => {
  let component: ReferrerTrackerReportComponent;
  let fixture: ComponentFixture<ReferrerTrackerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerTrackerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerTrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
