import { Component, Inject, Injectable, OnInit, Signal, inject, signal } from '@angular/core';
import { UserService } from '../[services]/user.service';
import { HeaderService } from '../[services]/header.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('heightAnimation', [
      // Transition from any state to void
      transition(':enter', [
        style({ height: '0', overflow: 'hidden', opacity: 0}),
        animate('0.2s ease-in', style({ height: '*', opacity: 1 }))
      ]),
      // Transition from void state to any state
      transition(':leave', [
        style({ height: '*', overflow: 'hidden', opacity:1 }),
        animate('0.2s ease-out', style({ height: '0', opacity: 0}))
      ])
    ])
  ]
})

export class HeaderComponent {

  public headerService: HeaderService = inject(HeaderService);
  public userService: UserService = inject(UserService);
  public auth: AuthService = inject(AuthService);

  constructor() { }

  hidden = <Signal<boolean>>this.headerService.hidden ?? signal(false);


  logout() {
    this.auth.logout();
  }

}