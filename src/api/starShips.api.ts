import { CancelToken } from 'axios';
import { httpApi } from './http.api';
import { ListRepose } from './types';

export interface StarshipDto {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

export function getStarShips(
  page: number,
  search?: string,
  cancelToken?: CancelToken,
): Promise<ListRepose<StarshipDto>> {
  let searchQ = search ? `&search=${search}` : '';
  return httpApi.get(`/vehicles/?page=${page}${searchQ}`, { cancelToken }).then(({ data }) => data);
}
