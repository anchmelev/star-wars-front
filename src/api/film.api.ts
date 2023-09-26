import { CancelToken } from 'axios';
import { httpApi } from './http.api';
import { ListRepose } from './types';

export interface FilmDto {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export function getFilms(page: number, search?: string, cancelToken?: CancelToken): Promise<ListRepose<FilmDto>> {
  const searchQ = search ? `&search=${search}` : '';
  return httpApi.get(`/films/?page=${page}${searchQ}`, { cancelToken }).then(({ data }) => data);
}
