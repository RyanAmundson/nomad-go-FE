import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-access',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>no-access works!</p>`,
  styleUrls: ['./no-access.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAccessComponent { }
