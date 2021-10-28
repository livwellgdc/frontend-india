import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeplinksListComponent } from './deeplinks-list.component';

describe('DeeplinksListComponent', () => {
  let component: DeeplinksListComponent;
  let fixture: ComponentFixture<DeeplinksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeeplinksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeplinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
