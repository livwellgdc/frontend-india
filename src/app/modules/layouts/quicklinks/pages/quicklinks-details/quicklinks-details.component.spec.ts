import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicklinksDetailsComponent } from './quicklinks-details.component';

describe('QuicklinksDetailsComponent', () => {
  let component: QuicklinksDetailsComponent;
  let fixture: ComponentFixture<QuicklinksDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicklinksDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicklinksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
