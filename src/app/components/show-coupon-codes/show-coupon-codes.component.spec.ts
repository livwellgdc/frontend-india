import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCouponCodesComponent } from './show-coupon-codes.component';

describe('ShowCouponCodesComponent', () => {
  let component: ShowCouponCodesComponent;
  let fixture: ComponentFixture<ShowCouponCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCouponCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCouponCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
