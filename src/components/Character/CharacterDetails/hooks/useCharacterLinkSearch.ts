import { ListRepose } from '@app/api/types';
import { AutocompleteSearchOptions, useAutocompleteSearch } from '@app/hooks/useAutocompleteSearch';
import { mapCharacterLink } from '../utils/mapCharacterLink';
import { useMemo } from 'react';
import { CharacterLink } from '@app/store/slices/characterSlice/types';
import { CancelToken } from 'axios';
import { useAppDispatch } from '@app/hooks/storeHooks';
import { actions } from '@app/store/slices/rootReducer';

type GetReq<T> = (page: number, search: string, cancelToken: CancelToken) => Promise<ListRepose<T>>;

export function useCharacterLinkSearch<T extends CharacterLink>(
  key: string,
  getReq: GetReq<T>,
  links: CharacterLink[] = [],
) {
  const dispatch = useAppDispatch();

  const options = useMemo(
    () =>
      ({
        key,
        persistSuggestions: links.map(mapCharacterLink),
        req: async (searchText, cancelToken) => {
          const { results, count } = await getReq(1, searchText, cancelToken);
          dispatch(actions.character.putLinks(results));
          const items = results.map((x) => mapCharacterLink(x));
          return { items, total: count };
        },
      } as AutocompleteSearchOptions),
    [links, key, getReq],
  );

  return useAutocompleteSearch(options);
}

export type CharacterLinkSearch<T extends CharacterLink> = ReturnType<typeof useCharacterLinkSearch<T>>;
