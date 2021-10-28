import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesDetailsComponent } from './badges-details.component';

describe('BadgesDetailsComponent', () => {
  let component: BadgesDetailsComponent;
  let fixture: ComponentFixture<BadgesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
