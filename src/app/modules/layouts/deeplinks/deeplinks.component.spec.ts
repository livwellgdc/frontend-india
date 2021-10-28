import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeplinksComponent } from './deeplinks.component';

describe('DeeplinksComponent', () => {
  let component: DeeplinksComponent;
  let fixture: ComponentFixture<DeeplinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeeplinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeplinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
