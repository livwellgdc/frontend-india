import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicklinksListComponent } from './quicklinks-list.component';

describe('QuicklinksListComponent', () => {
  let component: QuicklinksListComponent;
  let fixture: ComponentFixture<QuicklinksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicklinksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicklinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
