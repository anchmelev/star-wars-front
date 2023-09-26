import { CharacterDto } from '@app/api/character.api';
import { FilmDto } from '@app/api/film.api';
import { PlanetDto } from '@app/api/planet.api';
import { SpeciesDto } from '@app/api/species.api';
import { StarshipDto } from '@app/api/starShips.api';
import { VehicleDto } from '@app/api/vehicle.api';

export interface Character extends CharacterDto {
  // extends
  id: number;
}

export type CharacterLink = SpeciesDto | StarshipDto | PlanetDto | FilmDto | VehicleDto;
export type CharacterLinkKeys = keyof Pick<Character, 'films' | 'species' | 'vehicles' | 'starships' | 'homeworld'>;

export type CharacterState = {
  editedById: Record<number, Character>;
  linksByUrl: Record<string, CharacterLink>;
  currentPage: number;
  search: string;
};
