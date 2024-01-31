import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { environment } from 'src/environments/environment';

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  (<any>js).src = "https://connect.facebook.net/en_US/sdk.js";
  fjs?.parentNode?.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fbInitialize() {
  return new Promise((resolve) => {


    window['fbAsyncInit'] = function () {
      window.FB.init({
        appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version: environment.facebookSDKVersion
      });
    };

    window.FB.getLoginStatus((response: any) => {

      if (response.status === 'connected') {
       resolve(true);
      }
    });
    resolve(true);
  });
}

function authInitializerFactory() {
  return () => fbInitialize();
}

export const FBInintializer: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializerFactory,
  deps: [],
  multi: true
};
