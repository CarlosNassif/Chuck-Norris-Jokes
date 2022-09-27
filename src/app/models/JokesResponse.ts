export interface JokesResponse {
  total: number;
  result: Joke[];
}

export interface Joke {
  categories: Category[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

export enum Category {
  Animal = 'animal',
  Career = 'career',
  Celebrity = 'celebrity',
  Dev = 'dev',
  Explicit = 'explicit',
  Fashion = 'fashion',
  Food = 'food',
  History = 'history',
  Money = 'money',
  Movie = 'movie',
  Music = 'music',
  Political = 'political',
  Religion = 'religion',
  Science = 'science',
  Sport = 'sport',
  Travel = 'travel',
}
