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
  jokes: Joke[] | null = teste.result;
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

const teste = {
  total: 6,
  result: [
    {
      categories: [],
      created_at: '2020-01-05 13:42:19.324003',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: '9lt_txy7txscuxsyfhb--g',
      updated_at: '2020-01-05 13:42:19.324003',
      url: 'https://api.chucknorris.io/jokes/9lt_txy7txscuxsyfhb--g',
      value:
        'After taking a steroids test doctors informed Chuck Norris that he had tested positive. He laughed upon receiving this information, and said "of course my urine tested positive, what do you think they make steroids from?"',
    },
    {
      categories: ['dev'],
      created_at: '2020-01-05 13:42:19.324003',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: 'e2gyguu0tg6di7-qykdjnw',
      updated_at: '2020-01-05 13:42:19.324003',
      url: 'https://api.chucknorris.io/jokes/e2gyguu0tg6di7-qykdjnw',
      value:
        'Chuck Norris originally appeared in the "Street Fighter II" video game, but was removed by Beta Testers because every button caused him to do a roundhouse kick. When asked about this glitch, Norris replied "That\'s no glitch."',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:20.262289',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: '3ew2Bz6gQmKbSTVCknrISQ',
      updated_at: '2020-01-05 13:42:20.262289',
      url: 'https://api.chucknorris.io/jokes/3ew2Bz6gQmKbSTVCknrISQ',
      value:
        'After reading about the April protests in Baltimore, Chuck Norris decided to attend the Orioles, White Sox game to protect the players. No protester or thug dared attend.',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:25.352697',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: 'CzoEfJ6WSqCpgdO6VTQrpw',
      updated_at: '2020-01-05 13:42:25.352697',
      url: 'https://api.chucknorris.io/jokes/CzoEfJ6WSqCpgdO6VTQrpw',
      value:
        'Chuck Norris originally appeared in the "Street Fighter II" video game, but was removed by Beta Testers because every button caused him to do a roundhouse kick. When asked bout this "glitch," Norris replied, "That\'s no glitch."',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:28.984661',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: 'YyDUUnNlQEWtSp771kjo1A',
      updated_at: '2020-01-05 13:42:28.984661',
      url: 'https://api.chucknorris.io/jokes/YyDUUnNlQEWtSp771kjo1A',
      value:
        'Chuck Norris was once in Street Fighter 2. He was then removed because beta testers experienced that every button makes Chuck Norris do a roundhouse kick. Beta testers then ask Chuck Norris about this "Glitch". Chuck Norris replys: "That\'s no glitch."',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:29.569033',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      id: 'cmVOzHTJTaiZbOX2wpJtnA',
      updated_at: '2020-01-05 13:42:29.569033',
      url: 'https://api.chucknorris.io/jokes/cmVOzHTJTaiZbOX2wpJtnA',
      value: 'Chuck Norris tested the tower 200 now the door has abs',
    },
  ],
};
