import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { of } from 'rxjs';

import { InstagramService } from './instagram.service';
import { FacebookGraphResponse, FacebookPost } from '../[models]/models';

describe('InstagramService', () => {
  let service: InstagramService;
  let httpTestingController: HttpTestingController;
  let mockSocialAuthService;

  beforeEach(() => {
    mockSocialAuthService = {
      authState: of({ id: 'test-id', authToken: 'test-token' } as SocialUser)
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InstagramService,
        { provide: SocialAuthService, useValue: mockSocialAuthService }
      ]
    });

    service = TestBed.inject(InstagramService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch a page successfully', async () => {
    const mockResponse: FacebookGraphResponse = {
      data: [{ id: '1', message: 'Test Post' }] as FacebookPost[],
      paging: { next: 'next-page-url', previous: 'previous-page-url'}
    };

    service.fetchPage(0).then(data => {
      expect(data).toEqual(mockResponse.data);
    });

    const req = httpTestingController.expectOne(service.sources[0] + '&access_token=test-token');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });


  it('should handle errors in fetchPage', async () => {
    service.fetchPage(0).catch(error => {
      expect(error.message).toContain('Failed to fetch page');
    });

    const req = httpTestingController.expectOne(service.sources[0] + '&access_token=test-token');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });

});
