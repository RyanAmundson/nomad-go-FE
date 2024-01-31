import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryTileFlippedComponent } from './masonry-tile-flipped.component';

describe('MasonryTileFlippedComponent', () => {
  let component: MasonryTileFlippedComponent;
  let fixture: ComponentFixture<MasonryTileFlippedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasonryTileFlippedComponent]
    });
    fixture = TestBed.createComponent(MasonryTileFlippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
