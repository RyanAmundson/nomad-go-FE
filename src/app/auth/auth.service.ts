import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private router: Router = inject(Router);
  private socialAuth: SocialAuthService = inject(SocialAuthService);
  private http: HttpClient = inject(HttpClient);

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor() {
    this.isLoggedIn$ = this.socialAuth.authState.pipe(map((user: SocialUser) => user && user.authToken != null));
    this.isLoggedIn$.subscribe((isloggedIn) => { if (!isloggedIn) this.router.navigate(['/login']) });
  }

  requestAccess() {
    return lastValueFrom(this.http.get('https://api.instagram.com/oauth/authorize?client_id=1450048075726012&redirect_uri=/auth/callback&scope=user_profile,user_media&response_type=code')).then((res) => {
    });
  }


  logout() {
    return this.socialAuth.signOut();
  }

}