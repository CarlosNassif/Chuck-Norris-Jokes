import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JokesResponse } from 'src/app/models/JokesResponse';

import { JOKES_RESPONSE_EXAMPLE } from './../../../test/JokesResponseExample';
import { ChuckNorrisService } from './chuck-norris.service';

describe('ChuckNorrisService', () => {
  let service: ChuckNorrisService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChuckNorrisService],
    });
    service = TestBed.inject(ChuckNorrisService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve jokes from query', () => {
    const query = 'test';
    service.getJokes(query).subscribe((jokes) => {
      expect(jokes).toBeTruthy();

      expect(jokes.total).toBe(JOKES_RESPONSE_EXAMPLE.total);

      const joke = jokes.result.find(
        (joke) => joke.id === JOKES_RESPONSE_EXAMPLE.result[3].id
      );

      expect(joke?.url).toBe(JOKES_RESPONSE_EXAMPLE.result[3].url);
    });

    const URL = `https://api.chucknorris.io/jokes/search?query=${query}`;
    const req = httpTestingController.expectOne(URL);

    expect(req.request.method).toBe('GET');

    req.flush(JOKES_RESPONSE_EXAMPLE);
  });

  it('should store jokes on the cache', () => {
    function checkJokes(jokes: JokesResponse) {
      expect(jokes).toBeTruthy();

      expect(jokes.total).toBe(JOKES_RESPONSE_EXAMPLE.total);

      const joke = jokes.result.find(
        (joke) => joke.id === JOKES_RESPONSE_EXAMPLE.result[3].id
      );

      expect(joke?.url).toBe(JOKES_RESPONSE_EXAMPLE.result[3].url);
    }

    const query = 'test';
    service.getJokes(query).subscribe((jokes) => {
      checkJokes(jokes);
    });

    const URL = `https://api.chucknorris.io/jokes/search?query=${query}`;
    const req = httpTestingController.expectOne(URL);

    expect(req.request.method).toBe('GET');

    let cachedJokes = service.cacheCopy[query];
    expect(cachedJokes).toBeFalsy();

    req.flush(JOKES_RESPONSE_EXAMPLE);

    cachedJokes = service.cacheCopy[query];

    checkJokes(cachedJokes);
  });
});
