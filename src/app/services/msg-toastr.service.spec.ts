import { TestBed } from '@angular/core/testing';

import { MsgToastrService } from './msg-toastr.service';

describe('MsgToastrService', () => {
  let service: MsgToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
