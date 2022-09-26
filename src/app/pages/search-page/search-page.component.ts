import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { Joke } from '../../models/JokesResponse';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  $search: EventEmitter<string> = new EventEmitter();
  jokes: Joke[] | null = null;
  readonly chuckNorrisIcon =
    'https://api.chucknorris.io/img/avatar/chuck-norris.png';

  constructor(private router: Router) {}

  searchJokes(query: string) {
    this.$search.next(query);
  }

  private subscribeToSearchEvent() {
    this.$search
      .pipe(
        filter((e) => !!e),
        debounceTime(1000)
      )
      .subscribe((query) => {
        this.router.navigate(['/results'], { queryParams: { query } });
      });
  }

  ngOnInit(): void {
    this.subscribeToSearchEvent();
  }
}
