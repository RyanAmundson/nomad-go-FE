import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export enum LoginState {
  LoggedIn,
  LoggedOut,
  LoggingIn,
  ErrorWhileLoggingIn
}

export enum LoginEvent {
  LoginStarted,
  LoginCompleted,
  LoginFailed,
  LogoutStarted,
  LogoutCompleted,
}


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  LoginState = LoginState;

  private router = inject(Router);
  public socialAuth = inject(SocialAuthService);
  public authService = inject(AuthService);

  loginChange: WritableSignal<LoginEvent | null> = signal<LoginEvent | null>(null);
  loggedInUser: Signal<SocialUser | null> = toSignal(this.socialAuth.authState, { initialValue: null });

  status: Signal<LoginState> = computed(() => {
    const event = this.loginChange();
    const user = this.loggedInUser();

    if (event == LoginEvent.LoginFailed) return LoginState.ErrorWhileLoggingIn;
    if (user) return LoginState.LoggedIn;
    if (event == LoginEvent.LoginStarted) return LoginState.LoggingIn;
    return LoginState.LoggedOut;
  });


  continue(): void {
    this.router.navigate(['/feedlist']).catch((err) => console.error("Failed to navigate: ", err));
  }

  login(): void {
    this.loginChange.set(LoginEvent.LoginStarted);
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {

      this.loginChange.set(LoginEvent.LoginCompleted);
    }).catch((err) => {
      console.error(err);
      this.loginChange.set(LoginEvent.LoginFailed);
    });
  }

  logout(): void {
    this.socialAuth.signOut();
  }

}