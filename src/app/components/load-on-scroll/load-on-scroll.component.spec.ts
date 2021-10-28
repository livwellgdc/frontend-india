import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadOnScrollComponent } from './load-on-scroll.component';

describe('LoadOnScrollComponent', () => {
  let component: LoadOnScrollComponent;
  let fixture: ComponentFixture<LoadOnScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadOnScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadOnScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
