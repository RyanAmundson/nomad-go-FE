import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  user$: Observable<SocialUser> = this.socialAuth.authState;

  constructor(private socialAuth: SocialAuthService) { }
  
}