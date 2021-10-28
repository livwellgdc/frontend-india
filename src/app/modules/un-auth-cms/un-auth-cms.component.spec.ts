import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthCmsComponent } from './un-auth-cms.component';

describe('UnAuthCmsComponent', () => {
  let component: UnAuthCmsComponent;
  let fixture: ComponentFixture<UnAuthCmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthCmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
