import { TestBed } from '@angular/core/testing';

import { FileUserService } from './file-user.service';

describe('FileUserService', () => {
  let service: FileUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
