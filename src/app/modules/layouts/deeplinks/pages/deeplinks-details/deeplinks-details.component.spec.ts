import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeplinksDetailsComponent } from './deeplinks-details.component';

describe('DeeplinksDetailsComponent', () => {
  let component: DeeplinksDetailsComponent;
  let fixture: ComponentFixture<DeeplinksDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeeplinksDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeplinksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
