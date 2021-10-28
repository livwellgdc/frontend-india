import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvUploadPopupComponent } from './csv-upload-popup.component';

describe('CsvUploadPopupComponent', () => {
  let component: CsvUploadPopupComponent;
  let fixture: ComponentFixture<CsvUploadPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvUploadPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
