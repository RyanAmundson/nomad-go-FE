import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorTitle: string = 'Error';
  errorMessage: string = 'An unexpected error has occurred.';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch query params and update error message and title if they exist
    this.activatedRoute.queryParams.subscribe(params => {
      this.errorTitle = params['errorTitle'] || this.errorTitle;
      this.errorMessage = params['error'] || this.errorMessage;
    });
  }
}
