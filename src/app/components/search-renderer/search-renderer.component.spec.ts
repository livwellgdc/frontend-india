import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRendererComponent } from './search-renderer.component';

describe('SearchRendererComponent', () => {
  let component: SearchRendererComponent;
  let fixture: ComponentFixture<SearchRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
