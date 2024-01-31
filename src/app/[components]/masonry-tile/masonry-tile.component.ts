import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-masonry-tile',
  templateUrl: './masonry-tile.component.html',
  styleUrls: ['./masonry-tile.component.scss']
})
export class MasonryTileComponent {
  @Input() content: any;
  @Input() id: any;
  @Output() expand: EventEmitter<any> = new EventEmitter();

  showDetails = false;
  noImage = signal(false);
  expanded = false;
  shake = false;
  mouseOver = false;

  hover:any;

  tileClick() {
    this.showDetails = !this.showDetails;

  }

  expandEmit() {
    this.expand.emit(this.id);
    this.expanded = true;
  }

  imageError() {
    this.noImage.set(true);
  }
}
