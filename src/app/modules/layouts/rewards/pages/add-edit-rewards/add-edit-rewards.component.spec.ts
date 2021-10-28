import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRewardsComponent } from './add-edit-rewards.component';

describe('AddEditRewardsComponent', () => {
  let component: AddEditRewardsComponent;
  let fixture: ComponentFixture<AddEditRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
