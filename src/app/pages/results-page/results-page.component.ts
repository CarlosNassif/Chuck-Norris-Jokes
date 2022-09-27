import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { Joke } from './../../models/JokesResponse';
import { ChuckNorrisService } from './../../services/chuck-norris/chuck-norris.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit {
  jokes!: Joke[];

  query!: string;

  showLoading: boolean = false;
  errorHappened: boolean = false;

  private $search: EventEmitter<string> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chuckNorrisService: ChuckNorrisService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const queryParam = params.get('query');
      if (!queryParam) {
        this.router.navigate(['/']);
      }
      this.query = queryParam as string;
      this.setFirstValue();
    });
  }

  searchJokes(query: string) {
    this.$search.next(query);
  }

  private setFirstValue() {
    this.searchJokes(this.query);
  }

  private subscribeToSearchEvent() {
    this.$search
      .pipe(
        filter((e) => !!e),
        debounceTime(1000),
        distinctUntilChanged((prev, curr) => prev === curr)
      )
      .subscribe((query) => {
        this.getJokesForQuery(query);
        this.router.navigate(['/results'], { queryParams: { query } });
      });
  }

  private getJokesForQuery(query: string) {
    this.showLoading = true;
    this.errorHappened = false;
    this.chuckNorrisService.getJokes(query).subscribe({
      next: (res) => {
        this.jokes = res.result;
        if (res.total == 0) {
          this.errorHappened = true;
        }
      },
      error: (err) => {
        console.error('error on getJokes()', err);
        this.errorHappened = true;
      },
      complete: () => {
        this.showLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.subscribeToSearchEvent();
    this.setFirstValue();
  }
}
