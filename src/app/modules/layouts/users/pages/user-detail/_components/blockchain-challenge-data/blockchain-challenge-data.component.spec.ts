import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainChallengeDataComponent } from './blockchain-challenge-data.component';

describe('BlockchainChallengeDataComponent', () => {
  let component: BlockchainChallengeDataComponent;
  let fixture: ComponentFixture<BlockchainChallengeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockchainChallengeDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainChallengeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
