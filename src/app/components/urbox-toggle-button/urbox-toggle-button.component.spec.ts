import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrboxToggleButtonComponent } from './urbox-toggle-button.component';

describe('UrboxToggleButtonComponent', () => {
  let component: UrboxToggleButtonComponent;
  let fixture: ComponentFixture<UrboxToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrboxToggleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrboxToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
