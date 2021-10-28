import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinWheelsListComponent } from './spin-wheels-list.component';

describe('SpinWheelsListComponent', () => {
  let component: SpinWheelsListComponent;
  let fixture: ComponentFixture<SpinWheelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinWheelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinWheelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
