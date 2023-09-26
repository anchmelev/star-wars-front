import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, FormInstance, Input } from 'antd';
import { Character } from '@app/store/slices/characterSlice/types';
import { AutocompleteSearchModel } from '@app/hooks/useAutocompleteSearch';
import { useAppSelector } from '@app/hooks/storeHooks';
import { mapCharacterLink } from '../utils/mapCharacterLink';

interface PlanetAutoCompleteProps {
  planets: AutocompleteSearchModel;
  form: FormInstance<Character>;
}

export const PlanetAutoComplete: React.FC<PlanetAutoCompleteProps> = ({ planets, form }) => {
  const { linksByUrl } = useAppSelector((state) => state.character);
  const [inputLabel, setInputLabel] = useState('');
  const [touched, setTouched] = useState(false);

  const setCharacterInputLabel = useCallback(() => {
    const homeworld = form.getFieldValue('homeworld') as string;
    const item = linksByUrl[homeworld]
      ? mapCharacterLink(linksByUrl[homeworld])
      : planets.items.find((x) => x.value === homeworld);

    setInputLabel(item?.label ?? homeworld);
  }, [planets.items, linksByUrl, form]);

  useEffect(() => {
    if (touched) return;
    setCharacterInputLabel();
  }, [planets.items, touched, form]);

  const homeworld = form.getFieldValue('homeworld') as string;

  useEffect(() => {
    setCharacterInputLabel();
  }, [form, homeworld]);

  const handleSearch = (value: string) => {
    setTouched(true);
    setInputLabel(value);
    planets.search(value);
  };

  return (
    <AutoComplete
      options={planets.items.map((item) => ({ value: item.value, label: item.label }))}
      value={inputLabel}
      onSelect={(value, option) => {
        form.setFieldsValue({ homeworld: value });
        setInputLabel(option.label);
      }}
      onSearch={handleSearch}
      onBlur={setCharacterInputLabel}
    >
      <Input.Search loading={planets.loading} onSearch={handleSearch} />
    </AutoComplete>
  );
};
