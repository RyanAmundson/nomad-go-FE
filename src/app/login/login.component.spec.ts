import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent, LoginState, LoginEvent } from './login.component';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService } from '../auth/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Mock services
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockSocialAuthService = {
    authState: of(null), // Observable of SocialUser
    signIn: jasmine.createSpy('signIn').and.resolveTo(new SocialUser()),
    signOut: jasmine.createSpy('signOut')
  };
  let mockAuthService = jasmine.createSpyObj('AuthService', ['methodName']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Declare the component and mock dependencies
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SocialAuthService, useValue: mockSocialAuthService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should start login process', () => {
    component.login();
    expect(component.loginChange()).toBe(LoginEvent.LoginStarted);
    expect(mockSocialAuthService.signIn).toHaveBeenCalledWith(FacebookLoginProvider.PROVIDER_ID);
  });
  
  it('should handle login success', async () => {
    await component.login();
    expect(component.loginChange()).toBe(LoginEvent.LoginCompleted);
  });
  
  it('should handle login failure', async () => {
    mockSocialAuthService.signIn.and.returnValue(throwError(() => new Error('Login failed')));
    await component.login();
    expect(component.loginChange()).toBe(LoginEvent.LoginFailed);
  });

  it('should log out', () => {
    component.logout();
    expect(mockSocialAuthService.signOut).toHaveBeenCalled();
  });

  it('should navigate to /feedlist after login', async () => {
    await component.continue();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/feedlist']);
  });
  
  
});
