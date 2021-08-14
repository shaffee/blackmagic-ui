import { TestBed } from '@angular/core/testing';

import { BlackuiService } from './blackui.service';

describe('BlackuiService', () => {
  let service: BlackuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
