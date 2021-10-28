import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivwellVideosComponent } from './livwell-videos.component';

describe('LivwellVideosComponent', () => {
  let component: LivwellVideosComponent;
  let fixture: ComponentFixture<LivwellVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivwellVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivwellVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
