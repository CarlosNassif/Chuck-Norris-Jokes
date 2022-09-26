import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JokesResponse } from '../../models/JokesResponse';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService {
  constructor(private http: HttpClient) {}

  getJokes(query: string): Observable<JokesResponse> {
    const URL: string = `https://api.chucknorris.io/jokes/search?query=${query}`;
    return this.http.get<JokesResponse>(URL);
  }
}
