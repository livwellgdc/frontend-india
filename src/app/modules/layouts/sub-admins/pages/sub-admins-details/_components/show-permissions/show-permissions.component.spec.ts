import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPermissionsComponent } from './show-permissions.component';

describe('ShowPermissionsComponent', () => {
  let component: ShowPermissionsComponent;
  let fixture: ComponentFixture<ShowPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
