import { getCharacterLinks } from '@app/api/character.api';
import { Character, CharacterLink } from '@app/store/slices/characterSlice/types';
import { useQuery } from 'react-query';
import { QUERY_STALE_TIME } from '../../constants';
import { useAppSelector } from '@app/hooks/storeHooks';

const opt = { staleTime: QUERY_STALE_TIME };

export function useCharacterLinkQueries(character: Character | undefined) {
  const { linksByUrl } = useAppSelector((state) => state.character);
  const { films, species, vehicles, starships, homeworld } = character ?? {};

  const queryFn = async (urls: string[] | undefined) => {
    if (!urls) return [];

    const notCached: string[] = [];
    const result: CharacterLink[] = [];
    for (const url of urls) {
      if (linksByUrl[url]) result.push(linksByUrl[url]);
      else notCached.push(url);
    }

    if (notCached.length > 0) {
      const links = await getCharacterLinks(notCached);
      result.push(...links);
    }

    return result;
  };

  const filmsQ = useQuery(['characterFilms', films], () => queryFn(films), opt);
  const speciesQ = useQuery(['characterSpecies', species], () => queryFn(species), opt);
  const vehiclesQ = useQuery(['characterVehicles', vehicles], () => queryFn(vehicles), opt);
  const starshipsQ = useQuery(['characterStarships', starships], () => queryFn(starships), opt);
  const homeworldQ = useQuery(
    ['characterHomeworld', homeworld],
    () => queryFn(homeworld ? [homeworld] : undefined),
    opt,
  );

  return { filmsQ, speciesQ, vehiclesQ, starshipsQ, homeworldQ };
}

export type CharacterLinkQueries = ReturnType<typeof useCharacterLinkQueries>;
