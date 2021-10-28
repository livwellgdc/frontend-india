import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardSuccessComponent } from './add-card-success.component';

describe('AddCardSuccessComponent', () => {
  let component: AddCardSuccessComponent;
  let fixture: ComponentFixture<AddCardSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
