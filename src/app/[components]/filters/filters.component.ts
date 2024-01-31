import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { InstagramService } from 'src/app/[services]/instagram.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {


  public instagram: InstagramService = inject(InstagramService);

  filters$:Promise<Map<string, number>>;
  ngOnInit() {
    this.filters$ = this.instagram.fetchFilters();
  }

  filterChange(event: any) {
    this.instagram.activeFilters$.next(event.value);
  }

}
