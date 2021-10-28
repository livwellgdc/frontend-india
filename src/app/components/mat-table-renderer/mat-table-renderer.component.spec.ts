import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableRendererComponent } from './mat-table-renderer.component';

describe('MatTableRendererComponent', () => {
  let component: MatTableRendererComponent;
  let fixture: ComponentFixture<MatTableRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatTableRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
