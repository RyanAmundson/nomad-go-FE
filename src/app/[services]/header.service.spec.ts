import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially not be hidden', () => {
    expect(service.hidden()).toBeFalse();
  });

  it('should hide', () => {
    service.hide();
    expect(service.hidden).toBeTrue();
  });

  it('should show', () => {
    service.show();
    expect(service.hidden()).toBeFalse();
  });
});
