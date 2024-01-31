import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { IsLoggedIn } from './[guards]/auth.guard';
import { CallbackComponent } from './auth/callback/callback.component';
import { NoAccessComponent } from './auth/no-access/no-access.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';

export const routes: Routes = [

  {
    component: FeedListComponent,
    path: 'feedlist',
    canActivate: [IsLoggedIn],
    canActivateChild: [IsLoggedIn]
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'no-access',
        component: NoAccessComponent
      }
    ]

  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]