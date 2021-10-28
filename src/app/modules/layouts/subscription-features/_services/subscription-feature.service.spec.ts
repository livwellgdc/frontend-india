import { TestBed } from '@angular/core/testing';

import { SubscriptionFeatureService } from './subscription-feature.service';

describe('SubscriptionFeatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionFeatureService = TestBed.get(SubscriptionFeatureService);
    expect(service).toBeTruthy();
  });
});
