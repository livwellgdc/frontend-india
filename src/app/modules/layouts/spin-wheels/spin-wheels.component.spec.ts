import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinWheelsComponent } from './spin-wheels.component';

describe('SpinWheelsComponent', () => {
  let component: SpinWheelsComponent;
  let fixture: ComponentFixture<SpinWheelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinWheelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinWheelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
