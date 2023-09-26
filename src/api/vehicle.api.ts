import { CancelToken } from 'axios';
import { httpApi } from './http.api';
import { ListRepose } from './types';

export interface VehicleDto {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
}

export function getVehicles(page: number, search?: string, cancelToken?: CancelToken): Promise<ListRepose<VehicleDto>> {
  const searchQ = search ? `&search=${search}` : '';
  return httpApi.get(`/vehicles/?page=${page}${searchQ}`, { cancelToken }).then(({ data }) => data);
}
