import { CancelToken } from 'axios';
import { httpApi } from './http.api';
import { ListRepose } from './types';

export interface PlanetDto {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export function getPlanets(page: number, search?: string, cancelToken?: CancelToken): Promise<ListRepose<PlanetDto>> {
  let searchQ = search ? `&search=${search}` : '';
  return httpApi.get(`/planets/?page=${page}${searchQ}`, { cancelToken }).then(({ data }) => data);
}
