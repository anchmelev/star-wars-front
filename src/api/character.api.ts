import { CharacterLink } from '@app/store/slices/characterSlice/types';
import { httpApi } from './http.api';
import { ListRepose } from './types';

export enum Gender {
  male = 'Male',
  female = 'Female',
  unknown = 'unknown',
  none = 'n/a',
}

export interface CharacterDto {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export function getCharacters(page: number, search?: string): Promise<ListRepose<CharacterDto>> {
  let searchQ = search ? `&search=${search}` : '';
  return httpApi.get(`/people/?page=${page}${searchQ}`).then(({ data }) => data);
}

export function getCharacter(characterId: number): Promise<CharacterDto> {
  return httpApi.get(`/people/${characterId}`).then(({ data }) => data);
}

//  we don’t complicate the logic; if it was not possible to load the values, then we simply display the url
export async function getCharacterLinks(urls: string[] | undefined): Promise<CharacterLink[]> {
  if (!urls || urls.length === 0) return [];

  const getLink = (url: string): Promise<CharacterLink> => httpApi.get(url).then(({ data }) => data);

  const resp = await Promise.allSettled(urls.map(getLink));

  const result: CharacterLink[] = [];
  for (const item of resp) {
    if (item.status === 'fulfilled') {
      result.push(item.value);
    }
  }

  return result;
}
