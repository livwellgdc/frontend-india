import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuicklinksComponent } from './add-edit-quicklinks.component';

describe('AddEditQuicklinksComponent', () => {
  let component: AddEditQuicklinksComponent;
  let fixture: ComponentFixture<AddEditQuicklinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditQuicklinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQuicklinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
