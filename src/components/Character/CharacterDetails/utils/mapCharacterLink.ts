import { FilmDto } from '@app/api/film.api';
import { PlanetDto } from '@app/api/planet.api';
import { SpeciesDto } from '@app/api/species.api';
import { StarshipDto } from '@app/api/starShips.api';
import { VehicleDto } from '@app/api/vehicle.api';
import { CharacterLink } from '@app/store/slices/characterSlice/types';

type LabelProps = Partial<Pick<FilmDto, 'title'> & Pick<StarshipDto & PlanetDto & SpeciesDto & VehicleDto, 'name'>>;

export function mapCharacterLink(characterLink: CharacterLink) {
  const labelProps = characterLink as LabelProps;
  const label = labelProps.title || labelProps.name;
  return {
    value: characterLink.url,
    label: label!,
  };
}
