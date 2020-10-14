import { TestBed } from '@angular/core/testing';

import { FoodItemApiService } from './food-item-api.service';

describe('FoodItemApiService', () => {
  let service: FoodItemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
