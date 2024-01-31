import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, map } from 'rxjs';


@Injectable()
export class IsLoggedIn implements CanActivate {

  authService: AuthService = inject(AuthService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn$.pipe(map((isLoggedIn: boolean) => isLoggedIn ? true : this.router.parseUrl('login')));
  }

}