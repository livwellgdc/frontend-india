import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeHistoryComponent } from './badge-history.component';

describe('BadgeHistoryComponent', () => {
  let component: BadgeHistoryComponent;
  let fixture: ComponentFixture<BadgeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
