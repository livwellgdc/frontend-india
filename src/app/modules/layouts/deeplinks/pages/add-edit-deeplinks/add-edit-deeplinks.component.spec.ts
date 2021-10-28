import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeeplinksComponent } from './add-edit-deeplinks.component';

describe('AddEditDeeplinksComponent', () => {
  let component: AddEditDeeplinksComponent;
  let fixture: ComponentFixture<AddEditDeeplinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDeeplinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeeplinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
