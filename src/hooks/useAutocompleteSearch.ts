import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import unionBy from 'lodash/unionBy';
import debounce from 'lodash/debounce';
import axios, { CancelToken, CancelTokenSource } from 'axios';

export type SuggestionItem = {
  value: string;
  label: string;
};

type RespData = { items: SuggestionItem[]; total: number };

export type AutocompleteSearchOptions = {
  key: string;
  req: (searchText: string, cancelToken: CancelToken) => Promise<RespData>;
  persistSuggestions: SuggestionItem[];
};

export function useAutocompleteSearch({ req, key, persistSuggestions }: AutocompleteSearchOptions, ...deps: unknown[]) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<SuggestionItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const searchTextRef = useRef(searchText);
  const cancelSourceRef = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    return () => {
      cancelSourceRef.current?.cancel('Component unmounted');
    };
  }, []);

  const { data, error, refetch } = useQuery<RespData>(
    [key, searchText, ...deps],
    async () => {
      cancelSourceRef.current?.cancel('Canceled due to new request');
      cancelSourceRef.current = axios.CancelToken.source();
      setLoading(true);

      try {
        const resp = await req(searchTextRef.current, cancelSourceRef.current.token);
        setItems(resp.items);
        setTotal(resp.total);
        setLoading(false);
        return resp;
      } catch (err) {
        setLoading(false);
        if (axios.isCancel(err)) {
          throw err;
        }

        return { items: [], total: 0 };
      }
    },
    {
      enabled: false,
    },
  );

  useLayoutEffect(() => {
    setItems((currentItems) => unionBy(persistSuggestions, currentItems, 'value'));
  }, [persistSuggestions.length]);

  useLayoutEffect(() => {
    if (data || !loading) {
      setItems((currentItems) => unionBy(data?.items ?? [], currentItems, 'value'));
    }
  }, [data, loading]);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      const search = text.trim();
      setSearchText(search);
      searchTextRef.current = search;
      setTimeout(() => {
        refetch();
      }, 100);
    }, 300),
    [refetch, key, ...deps],
  );

  const errorMessage = (error as Error)?.message ?? '';

  return {
    loading,
    items,
    total,
    search: debouncedSearch,
    error: errorMessage,
  };
}

export type AutocompleteSearchModel = ReturnType<typeof useAutocompleteSearch>;
