import { SocialAuthService } from '@abacritt/angularx-social-login';
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

function initialize(socialAuthService: SocialAuthService, router: Router) {
  return lastValueFrom(socialAuthService.authState).then((user) => {

    if (!user) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  });
}

function authInitializerFactory(socialAuthService: SocialAuthService, router: Router) {
  return () => initialize(socialAuthService, router);
}

export const AuthInitializer: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializerFactory,
  deps: [SocialAuthService, Router],
  multi: true
};
