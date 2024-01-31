import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public hidden = signal(false);


  public hide() {
    this.hidden.set(true);
  }

  public show() {
    this.hidden.set(false);
  }
}
