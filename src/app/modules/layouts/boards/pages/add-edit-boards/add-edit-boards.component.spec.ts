import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoardsComponent } from './add-edit-boards.component';

describe('AddEditBoardsComponent', () => {
  let component: AddEditBoardsComponent;
  let fixture: ComponentFixture<AddEditBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
