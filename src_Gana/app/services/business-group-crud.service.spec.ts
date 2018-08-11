import { TestBed, inject } from '@angular/core/testing';

import { BusinessGroupCrudService } from './business-group-crud.service';

describe('BusinessGroupCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessGroupCrudService]
    });
  });

  it('should be created', inject([BusinessGroupCrudService], (service: BusinessGroupCrudService) => {
    expect(service).toBeTruthy();
  }));
});
