import { ApplicationInitStatus, Component, inject } from '@angular/core';
import { UserService } from './[services]/user.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private user: UserService = inject(UserService);
  private appInitStatus: ApplicationInitStatus = inject(ApplicationInitStatus);
  appReady = Promise.all([this.appInitStatus.donePromise, lastValueFrom(this.user.user$)]).then(() => true);
}
