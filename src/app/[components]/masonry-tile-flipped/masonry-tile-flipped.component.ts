import { Component, Input } from '@angular/core';
import { FacebookPost } from 'src/app/[models]/models';

@Component({
  selector: 'app-masonry-tile-flipped',
  templateUrl: './masonry-tile-flipped.component.html',
  styleUrls: ['./masonry-tile-flipped.component.scss']
})
export class MasonryTileFlippedComponent {

  @Input() post!: FacebookPost;

}
