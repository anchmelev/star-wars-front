import { CancelToken } from 'axios';
import { httpApi } from './http.api';
import { ListRepose } from './types';

export interface SpeciesDto {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
}

export function getSpecies(page: number, search?: string, cancelToken?: CancelToken): Promise<ListRepose<SpeciesDto>> {
  let searchQ = search ? `&search=${search}` : '';
  return httpApi.get(`/species/?page=${page}${searchQ}`, { cancelToken }).then(({ data }) => data);
}
