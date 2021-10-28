import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsDetailsComponent } from './versions-details.component';

describe('VersionsDetailsComponent', () => {
  let component: VersionsDetailsComponent;
  let fixture: ComponentFixture<VersionsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
