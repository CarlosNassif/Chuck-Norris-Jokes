import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  private $search: EventEmitter<string> = new EventEmitter();

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
