import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayModalComponent } from './videoplay-modal.component';

describe('VideoplayModalComponent', () => {
  let component: VideoplayModalComponent;
  let fixture: ComponentFixture<VideoplayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoplayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
