export interface JokesResponse {
  total: number;
  result: Joke[];
}

export interface Joke {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}
