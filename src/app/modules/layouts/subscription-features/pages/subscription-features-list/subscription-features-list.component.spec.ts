import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFeaturesListComponent } from './subscription-features-list.component';

describe('SubscriptionFeaturesListComponent', () => {
  let component: SubscriptionFeaturesListComponent;
  let fixture: ComponentFixture<SubscriptionFeaturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionFeaturesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFeaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
