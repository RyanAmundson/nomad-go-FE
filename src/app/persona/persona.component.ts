import { Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { UserService } from '../[services]/user.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {

  public userService = inject(UserService)

  noImage:WritableSignal<boolean> = signal(false);

  user$ = this.userService.user$;

  failedToLoadProfileImage() {
    this.noImage.set(true);
  }

}
