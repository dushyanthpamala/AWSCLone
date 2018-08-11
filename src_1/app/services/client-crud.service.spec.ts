import { TestBed, inject } from '@angular/core/testing';

import { ClientCrudService } from './client-crud.service';

describe('ClientCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientCrudService]
    });
  });

  it('should be created', inject([ClientCrudService], (service: ClientCrudService) => {
    expect(service).toBeTruthy();
  }));
});
