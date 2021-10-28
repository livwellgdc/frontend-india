import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivwellVideosDetailsComponent } from './livwell-videos-details.component';

describe('LivwellVideosDetailsComponent', () => {
  let component: LivwellVideosDetailsComponent;
  let fixture: ComponentFixture<LivwellVideosDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivwellVideosDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivwellVideosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
