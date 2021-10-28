import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReelsComponent } from './add-edit-reels.component';

describe('AddEditReelsComponent', () => {
  let component: AddEditReelsComponent;
  let fixture: ComponentFixture<AddEditReelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditReelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditReelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
