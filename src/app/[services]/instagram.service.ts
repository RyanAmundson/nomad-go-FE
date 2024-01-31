import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, of, shareReplay, switchMap, take, tap, throwError } from 'rxjs';
import { FacebookGraphResponse, FacebookPost, generateMultipleFacebookPosts } from '../[models]/models';




@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  token: string = '';
  userID: string = 'me';
  apiVersion: string = 'v19.0';
  fields: string = "message_tags,properties,full_picture,name,message,created_time,permalink_url,expanded_width,expanded_height,description,type,caption,icon,height,multi_share_end_card,source,width,link,place,is_hidden,is_expired,actions,attachments{description_tags}";
  sources: string[] = [];
  apiURL: string = 'https://graph.facebook.com';
  subscriptions: any[] = [];
  places: Map<string, number> = new Map();
  public activeFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  authToken$: Observable<string> = this.socialAuth.authState.pipe(map((user) => user.authToken));
  testData = generateMultipleFacebookPosts(100);

  constructor(private http: HttpClient, private socialAuth: SocialAuthService) {
    this.subscriptions.push([
      this.socialAuth.authState.subscribe((user) => {
        if (!user.id || !user.authToken) return;

        this.token = user.authToken;
        this.userID = user.id;
        this.sources = [`${this.apiURL}/${this.apiVersion}/${this.userID}/feed?fields=${this.fields}`];
      })
    ]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  fetchPage(page: number): Promise<FacebookPost[]> {
    if (page > this.sources.length || this.sources[page] === undefined || this.sources[page] === null) return Promise.reject(Error('page source not available yet'));

    return lastValueFrom(this.authToken$.pipe(
      map((token) => `${this.sources[page]}&access_token=${token}`),
      switchMap((query: string) => this.http.get<FacebookGraphResponse>(query)),
      tap((res: FacebookGraphResponse) => this.sources.push(res.paging.next)),
      map((res: FacebookGraphResponse) => res.data),
      catchError((e) => this.handleHttpError(e)),
      take(1)
    ))
  }

  // All Filters
  fetchFilters(): Promise<any> {
    return lastValueFrom(this.authToken$.pipe(
      switchMap((token) => this.http.get<FacebookGraphResponse>(`${this.apiURL}/${this.apiVersion}/${this.userID}/feed?fields=place&access_token=${token}&limit=50`)),
      map((res: FacebookGraphResponse) => this.buildFilters(res.data)),
      catchError((e) => this.handleHttpError(e)),
      take(1)
    ));
  }

  applyFilters(list: FacebookPost[], activeFilters: string[]): FacebookPost[] {
    if (activeFilters?.length === 0) return list;
    return list.filter((item: FacebookPost) => item.place && item.place.name ? activeFilters.includes(item?.place?.name) : false);
  }

  buildFilters(filters: Partial<FacebookPost[]>): Map<string, number> {
    filters.forEach((item: any) => {
      if (!item?.place?.name) return;
      const count = this.places.get(item?.place?.name) ?? 0;
      this.places.set(item?.place?.name, count + 1);
    });
    return this.places;
  }

  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }

    switch (error.error.error.code) {
      case 368:
        errorMessage = 'The action attempted has been deemed abusive or is otherwise disallowed.';
        break;
      case 190:
        errorMessage = 'Invalid OAuth 2.0 Access Token.';
        break;
      case 100:
        errorMessage = 'Invalid parameter.';
        break;
      case 200:
        errorMessage = 'Permissions error.';
        break;
      default:
        errorMessage = `Unknown error occurred: ${error.error.error.message}`;
    }

    console.error(`[API Error]: ${errorMessage}`);
    return throwError(() => new Error('Failed to fetch page'));
  }

}
