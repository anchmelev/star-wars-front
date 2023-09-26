import React, { memo, useMemo, useState } from 'react';
import { FormInstance, Select, Space, Typography } from 'antd';
import { Character, CharacterLinkKeys } from '@app/store/slices/characterSlice/types';
import { Loading } from '@app/components/Loading/Loading';
import { AutocompleteSearchModel } from '@app/hooks/useAutocompleteSearch';
import { useHighlightCallback } from '@app/hooks/useHighlightSearch';
import * as S from './CharacterEdit.style';
import { useForceUpdate } from '@app/hooks/useForceUpdate';

const { Text } = Typography;

export type CharacterSelectProps = Exclude<CharacterLinkKeys, 'homeworld'>;

interface CharacterSelectItemsProps {
  label: string;
  prop: CharacterSelectProps;
  model: AutocompleteSearchModel;
  form: FormInstance<Character>;
}

export const CharacterSelectItems: React.FC<CharacterSelectItemsProps> = memo((props) => {
  const { label, form, prop, model } = props;
  // for fast response with local elements
  const [searchValue, setSearchValue] = useState('');
  const forceUpdate = useForceUpdate();

  const filteredItems = useMemo(() => {
    const str = searchValue.trim().toLowerCase();
    return model.items.filter((option) => option.label.trim().toLowerCase().includes(str));
  }, [model.items, searchValue]);

  const highlight = useHighlightCallback();

  return (
    <Select
      loading={model.loading}
      mode="multiple"
      value={form.getFieldValue(prop)}
      searchValue={searchValue}
      placeholder={`Select ${label}`}
      onFocus={() => model.search(searchValue)}
      onSearch={(value) => {
        model.search(value);
        setSearchValue(value);
      }}
      filterOption={false}
      onDeselect={(value) => {
        const currentValues = form.getFieldValue(prop) as string[];
        form.setFieldValue(
          prop,
          currentValues.filter((item) => item !== value),
        );
        forceUpdate();
      }}
      onSelect={(_, option) => {
        const currentValues = form.getFieldValue(prop);
        form.setFieldValue(prop, [...currentValues, option.value as string]);
        forceUpdate();
      }}
      dropdownRender={(menu) => {
        let total: React.ReactNode;
        if (model.loading) {
          total = <Loading ownWidth size="1em" />;
        } else {
          total = Math.max(model.total, filteredItems.length);
        }

        return (
          <div>
            <S.DropdownHeader align={'middle'} justify={'space-between'}>
              <Text>To start searching, enter text in the input field</Text>

              <Space size={[4, 0]}>
                <Text>
                  Showing <Text strong>{filteredItems.length}</Text> out of
                </Text>
                {total}
              </Space>
            </S.DropdownHeader>
            {menu}
          </div>
        );
      }}
    >
      {filteredItems.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {highlight(option.label, searchValue)}
        </Select.Option>
      ))}
    </Select>
  );
});
