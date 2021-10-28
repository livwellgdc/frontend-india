import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesListingComponent } from './classes-listing.component';

describe('ClassesListingComponent', () => {
  let component: ClassesListingComponent;
  let fixture: ComponentFixture<ClassesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
