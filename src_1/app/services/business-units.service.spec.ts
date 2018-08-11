import { TestBed, inject } from '@angular/core/testing';

import { BusinessUnitsService } from './business-units.service';

describe('BusinessUnitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessUnitsService]
    });
  });

  it('should be created', inject([BusinessUnitsService], (service: BusinessUnitsService) => {
    expect(service).toBeTruthy();
  }));
});
