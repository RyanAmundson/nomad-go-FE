import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IsLoggedIn } from './[guards]/auth.guard';
import { HeaderComponent } from './header/header.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import { MasonryTileComponent } from './[components]/masonry-tile/masonry-tile.component';
import { MasonryComponent } from './[components]/masonry/masonry.component';
import { PersonaComponent } from './persona/persona.component';
import { FiltersComponent } from './[components]/filters/filters.component';
import { MatChipsModule } from '@angular/material/chips';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { MasonryTileFlippedComponent } from './[components]/masonry-tile-flipped/masonry-tile-flipped.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    FeedListComponent,
    LoginComponent,
    HeaderComponent,
    CallbackComponent,
    MasonryTileComponent,
    MasonryComponent,
    PersonaComponent,
    FiltersComponent,
    ErrorPageComponent,
    MasonryTileFlippedComponent,

  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatChipsModule,
    MatSidenavModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId),
          },
        ],
      },
    },
    // AuthInitializer,
    // FBInintializer
    IsLoggedIn,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
