import { Component, EventEmitter, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { Joke } from '../../models/JokesResponse';
import { ChuckNorrisService } from '../../services/chuck-norris/chuck-norris.service';

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

  constructor(private chuckNorrisService: ChuckNorrisService) {}

  searchJokes(query: string) {
    this.$search.next(query);
  }

  private subscribeToSearchEvent() {
    this.$search
      .pipe(
        filter((e) => !!e),
        debounceTime(500),
        distinctUntilChanged((prev, curr) => prev === curr)
      )
      .subscribe((query) => {
        this.getJokesForQuery(query);
      });
  }

  private getJokesForQuery(query: string) {
    this.chuckNorrisService.getJokes(query).subscribe({
      next: (res) => {
        this.jokes = res.result;
      },
      error: (err) => {
        console.log(
          '🚀 -> SearchPageComponent -> this.chuckNorrisService.getJokes -> err',
          err
        );
      },
    });
  }

  ngOnInit(): void {
    this.subscribeToSearchEvent();
  }
}
