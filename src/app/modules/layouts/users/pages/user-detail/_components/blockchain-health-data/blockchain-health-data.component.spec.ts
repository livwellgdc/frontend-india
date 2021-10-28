import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainHealthDataComponent } from './blockchain-health-data.component';

describe('BlockchainHealthDataComponent', () => {
  let component: BlockchainHealthDataComponent;
  let fixture: ComponentFixture<BlockchainHealthDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainHealthDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainHealthDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
