import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { concatMap, debounce, distinctUntilChanged, filter, map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { InstagramService } from '../[services]/instagram.service';
import { Observable, Subject, combineLatest, defer, fromEvent, of, timer } from 'rxjs';

import { HeaderService } from '../[services]/header.service';
import { FacebookPost } from '../[models]/models';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
    styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent {
    private instagramService = inject(InstagramService);
    private headerService: HeaderService = inject(HeaderService);

    @ViewChild('feedList', { static: true, read: ElementRef }) feedList!: ElementRef;

    allPosts$: Observable<FacebookPost[]> = of([]);
    filteredPosts$: Observable<FacebookPost[]> = of([]);
    page$ = new Subject<number>();
    currentPage = 0;
    loading = signal(true);

    ngOnInit(): void {
        this.page$ = new Subject<number>();
        this.allPosts$ = this.page$.pipe(
            startWith(0),
            tap(() => this.loading.set(true)),
            concatMap((num: number) => this.instagramService.fetchPage(num)),
            scan<FacebookPost[], FacebookPost[]>((acc, val) => acc.concat(val), []),
            tap(() => this.currentPage++),
            shareReplay(1)
        );

        this.filteredPosts$ = combineLatest([this.allPosts$, this.instagramService.activeFilters$]).pipe(
            map(([posts, filters]: [FacebookPost[], string[]]) => this.instagramService.applyFilters(posts, filters)),
            tap(() => this.loading.set(false)),
            shareReplay(1),
        );

    }

    ngAfterViewInit(): void {
        fromEvent(this.feedList.nativeElement, 'scroll').pipe(
            tap((e: any) => e.target.scrollTop !== 0 ? this.headerService.hide() : this.headerService.show()),
            map((e: any) => [e.target.scrollTop, e.target.scrollHeight, e.target.offsetHeight]),
            filter(this.onScrollBottom),
            tap(() => this.loading.set(true)),
            distinctUntilChanged(),
            debounce(() => timer(3000)),
        ).subscribe(() => {
            this.page$.next(this.currentPage);
        });
    }

    private onScrollBottom([scrollTop, scrollHeight, offsetHeight]: any[]): boolean {
        let pos = scrollTop + offsetHeight;
        let max = scrollHeight;
        return pos > max - 200;
    }

}
