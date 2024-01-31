import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedListComponent } from './feed-list.component';
import { InstagramService } from '../[services]/instagram.service';
import { HeaderService } from '../[services]/header.service';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Mock services
class MockInstagramService {
  activeFilters$ = of(<any>[]);
  fetchPage = jasmine.createSpy('fetchPage').and.returnValue(of([]));
  applyFilters = jasmine.createSpy('applyFilters').and.callFake((posts, filters) => posts);
}

class MockHeaderService {
  show = jasmine.createSpy('show');
  hide = jasmine.createSpy('hide');
}


describe('FeedListComponent', () => {
  let component: FeedListComponent;
  let fixture: ComponentFixture<FeedListComponent>;
  let mockInstagramService: MockInstagramService;
  let mockHeaderService: MockHeaderService;

  beforeEach(async () => {
    mockInstagramService = new MockInstagramService();
    mockHeaderService = new MockHeaderService();

    await TestBed.configureTestingModule({
      declarations: [FeedListComponent],
      providers: [
        { provide: InstagramService, useValue: mockInstagramService },
        { provide: HeaderService, useValue: mockHeaderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch the first page of posts on initialization', () => {
    expect(mockInstagramService.fetchPage).toHaveBeenCalledWith(0);
  });

  it('should call HeaderService hide/show on scroll', () => {
    const feedListElement = fixture.debugElement.query(By.css('.feed-list')).nativeElement;
    feedListElement.dispatchEvent(new Event('scroll'));
    // Depending on the scroll position, either `show` or `hide` should be called.
    // This is a basic example, you might need to set the scroll position programmatically.
    expect(mockHeaderService.show).toHaveBeenCalled();
    // Or expect(mockHeaderService.hide).toHaveBeenCalled(); depending on the test setup.
  });

  it('should apply filters to the posts', () => {
    const testPosts = [{ /* Mock post data */ }];
    const testFilters = ['filter1', 'filter2'];
    mockInstagramService.activeFilters$ = of(testFilters);
    component.ngOnInit(); // Reinitialize to use the updated filters observable
    fixture.detectChanges();

    expect(mockInstagramService.applyFilters).toHaveBeenCalledWith(testPosts, testFilters);
  });

});
