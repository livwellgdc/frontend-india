import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelsDetailsComponent } from './reels-details.component';

describe('ReelsDetailsComponent', () => {
  let component: ReelsDetailsComponent;
  let fixture: ComponentFixture<ReelsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
