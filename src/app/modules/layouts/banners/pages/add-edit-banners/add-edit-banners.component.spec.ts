import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBannersComponent } from './add-edit-banners.component';

describe('AddEditBannersComponent', () => {
  let component: AddEditBannersComponent;
  let fixture: ComponentFixture<AddEditBannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
