import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, of, tap } from 'rxjs';

import { JokesResponse } from '../../models/JokesResponse';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService {
  private cache: {
    [query: string]: JokesResponse;
  } = {};

  constructor(private http: HttpClient) {}

  /**
   * Searches on the ChuckNorris.io API for the query given and prevents requests
   * for the same query.
   *
   * @param query full-text to be search
   * @returns list of jokes that contains full-text searched
   */
  getJokes(query: string): Observable<JokesResponse> {
    if (!!this.cache[query]) {
      return of(this.cache[query]);
    }

    const URL: string = `https://api.chucknorris.io/jokes/search?query=${query}`;
    return this.http.get<JokesResponse>(URL).pipe(this.cacheQuery(query));
  }

  /**
   * Stores the results of given query on the cache object. The key used is the
   * query value itself.
   *
   * @param query
   * @returns function to store the query's result Jokes on the cache
   */
  private cacheQuery(query: string): MonoTypeOperatorFunction<JokesResponse> {
    return tap((e: JokesResponse) => {
      this.cache[query] = e;
    });
  }
}
