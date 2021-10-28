import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCodesListComponent } from './assigned-codes-list.component';

describe('AssignedCodesListComponent', () => {
  let component: AssignedCodesListComponent;
  let fixture: ComponentFixture<AssignedCodesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedCodesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedCodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
