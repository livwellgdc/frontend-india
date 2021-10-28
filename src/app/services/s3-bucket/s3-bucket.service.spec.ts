import { TestBed } from '@angular/core/testing';

import { S3BucketService } from './s3-bucket.service';

describe('S3BucketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: S3BucketService = TestBed.get(S3BucketService);
    expect(service).toBeTruthy();
  });
});
