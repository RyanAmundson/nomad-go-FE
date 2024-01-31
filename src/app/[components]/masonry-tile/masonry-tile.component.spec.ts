import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasonryTileComponent } from './masonry-tile.component';

describe('MasonryTileComponent', () => {
  let component: MasonryTileComponent;
  let fixture: ComponentFixture<MasonryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasonryTileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should accept input for content and id', () => {
    component.content = 'Test Content';
    component.id = 'Test ID';
    expect(component.content).toBe('Test Content');
    expect(component.id).toBe('Test ID');
  });

  it('should emit expand event with id', () => {
    spyOn(component.expand, 'emit');

    component.id = '123';
    component.expandEmit();

    expect(component.expand.emit).toHaveBeenCalledWith('123');
  });

  it('should toggle showDetails on tile click', () => {
    expect(component.showDetails).toBeFalse();

    component.tileClick();
    expect(component.showDetails).toBeTrue();

    component.tileClick();
    expect(component.showDetails).toBeFalse();
  });

  it('should set noImage to true on image error', () => {
    expect(component.noImage()).toBeFalse();

    component.imageError();
    expect(component.noImage()).toBeTrue();
  });

  it('should set expanded to true on expandEmit', () => {
    expect(component.expanded).toBeFalse();

    component.expandEmit();
    expect(component.expanded).toBeTrue();
  });

});
