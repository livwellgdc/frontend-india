import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLivwellVideosComponent } from './add-edit-livwell-videos.component';

describe('AddEditLivwellVideosComponent', () => {
  let component: AddEditLivwellVideosComponent;
  let fixture: ComponentFixture<AddEditLivwellVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLivwellVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLivwellVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
