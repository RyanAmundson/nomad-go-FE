import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, of, tap } from 'rxjs';
import { TileLayout, Tile } from 'src/app/[models]/models';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => *', [ // or use ':enter' if the container itself doesn't enter or leave
        query(':enter', [
          style({ opacity: 0 }),
          stagger('100ms', animate('0.3s ease-in', style({ opacity: 1 })))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          stagger('100ms', animate('0.3s ease-in', style({ opacity: 0 })))
        ], { optional: true })
      ])
    ])
  ]
})
export class MasonryComponent {
  /**
   * Dependencies
   */
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * I/O
   */
  @Input() tiles;
  /**
   * Properties
   */
  layout: TileLayout[] = [
    { cols: 2, rows: 1 },
    { cols: 1, rows: 2 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 2, rows: 1 },
  ];
  // No space for multi column on mobile
  phoneLayout: TileLayout = { cols: 1, rows: 2 };
  columns$ = new BehaviorSubject(3);
  rowHeight = '200px';
  gutterSize = '10px';
  displayedTiles$ = of([]);


  constructor() {
    // Adjust columns when screen changes
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
      distinctUntilChanged(),
      map((results) => results.breakpoints[Breakpoints.HandsetPortrait] ? 1 : results.breakpoints[Breakpoints.TabletPortrait] ? 2 : 3)
    ).subscribe((columns) => {
      this.columns$.next(columns);
      this.tiles = this.process(this.tiles, columns);
    } );
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.tiles = this.process(this.tiles, this.columns$.value);
  }

  trackBy(index: any, tile: any) {
    return tile.id;
  }

  expand(index: number) {
    this.tiles[index].cols = this.columns$.value;
    this.tiles[index].rows = this.columns$.value;
  }


  process(tiles: Tile[], columns: number): Tile[] {
    if(tiles === undefined || tiles === null) return [];
    return tiles.filter((t: Tile) => t.full_picture).map((tile: Tile, index: number) => {
      console.log(columns);
      if (columns === 1) {
        tile = { ...tile, ...this.phoneLayout };
        return tile;
      } else {
        const layoutIndex = index % this.layout.length;
        tile = { ...tile, ...this.layout[layoutIndex] };
        return tile;
      }
    })
  }
}
