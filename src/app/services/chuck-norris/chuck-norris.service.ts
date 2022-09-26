import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { JokesResponse } from '../../models/JokesResponse';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService {
  private cache: {
    [query: string]: JokesResponse;
  } = {};

  constructor(private http: HttpClient) {}

  getJokes(query: string): Observable<JokesResponse> {
    if (!!this.cache[query]) {
      return of(this.cache[query]);
    }

    const URL: string = `https://api.chucknorris.io/jokes/search?query=${query}`;
    return this.http.get<JokesResponse>(URL).pipe(this.cacheQuery(query));
  }

  private cacheQuery(query: string) {
    return tap((e: JokesResponse) => {
      this.cache[query] = e;
    });
  }
}
