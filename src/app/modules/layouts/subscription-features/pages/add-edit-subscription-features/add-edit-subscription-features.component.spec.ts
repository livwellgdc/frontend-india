import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubscriptionFeaturesComponent } from './add-edit-subscription-features.component';

describe('AddEditSubscriptionFeaturesComponent', () => {
  let component: AddEditSubscriptionFeaturesComponent;
  let fixture: ComponentFixture<AddEditSubscriptionFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSubscriptionFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubscriptionFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
