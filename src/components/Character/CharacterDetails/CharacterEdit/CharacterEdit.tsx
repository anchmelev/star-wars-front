import React, { memo, useEffect } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { Gender } from '@app/api/character.api';
import { AutocompleteSearchModel } from '../../../../hooks/useAutocompleteSearch';
import { getFilms } from '@app/api/film.api';
import { useResponsive } from '@app/hooks/useResponsive';
import { StickyCard } from '../CharacterDetails.style';
import { CharacterEditActions } from './CharacterEditActions';
import { Character, CharacterLink } from '@app/store/slices/characterSlice/types';
import { CharacterCardTitle } from '../CharacterCardTitle/CharacterCardTitle';
import { useCharacterLinkSearch } from '../hooks/useCharacterLinkSearch';
import { CharacterSelectItems, CharacterSelectProps } from './CharacterSelectItems';
import { Loading } from '@app/components/Loading/Loading';
import { CharacterLinkQueries } from '../hooks/useCharacterLinksQuery';
import cloneDeep from 'lodash/cloneDeep';
import { getSpecies } from '@app/api/species.api';
import { getStarShips } from '@app/api/starShips.api';
import { getVehicles } from '@app/api/vehicle.api';
import { PlanetAutoComplete } from './PlanetAutoComplete';
import { UseQueryResult } from 'react-query';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { getPlanets } from '@app/api/planet.api';
import * as S from './CharacterEdit.style';
import { useForceUpdate } from '@app/hooks/useForceUpdate';

interface CharacterEditProps {
  queries: CharacterLinkQueries;
  character: Character;
  toggleEdit: () => void;
}

export type InputStringKeys = keyof Pick<Character, 'name' | 'birth_year' | 'hair_color' | 'skin_color' | 'eye_color'>;
export type InputNumberKeys = keyof Pick<Character, 'height' | 'mass'>;

export const CharacterEdit: React.FC<CharacterEditProps> = memo(({ character, queries, toggleEdit }) => {
  const { isTablet } = useResponsive();

  const [form] = Form.useForm<Character>();
  const forceUpdate = useForceUpdate();

  const films = useCharacterLinkSearch('films', getFilms, queries.filmsQ.data);
  const species = useCharacterLinkSearch('species', getSpecies, queries.speciesQ.data);
  const vehicles = useCharacterLinkSearch('vehicles', getVehicles, queries.vehiclesQ.data);
  const starships = useCharacterLinkSearch('starships', getStarShips, queries.starshipsQ.data);
  const planets = useCharacterLinkSearch('planets', getPlanets, queries.homeworldQ.data);

  useEffect(() => {
    form.setFieldsValue(cloneDeep(character));
  }, [character]);

  const loader = <Loading justify="start" size="2em" />;

  const getValidateState = (query: UseQueryResult<CharacterLink[], unknown>, model: AutocompleteSearchModel) => {
    const qErrorMsg = (query.error as Error)?.message;
    const validateStatus: ValidateStatus = qErrorMsg || model.error ? 'error' : '';
    const help = qErrorMsg || model.error;

    return { validateStatus, help };
  };

  const renderSelectItem = (
    label: string,
    prop: CharacterSelectProps,
    query: UseQueryResult<CharacterLink[], unknown>,
    model: AutocompleteSearchModel,
  ) => {
    return (
      <Form.Item label={`${label}:`} {...getValidateState(query, model)}>
        {query.isLoading ? loader : <CharacterSelectItems label={label} prop={prop} model={model} form={form} />}
      </Form.Item>
    );
  };

  const renderInputNumberItem = (label: string, prop: InputNumberKeys, addonAfter: string) => {
    const MIN = 1;
    const MAX = 99999999;
    return (
      <Form.Item
        name={prop}
        label={`${label}:`}
        rules={[
          {
            type: 'number',
            min: MIN,
            max: MAX,
          },
        ]}
      >
        <S.InputNumber onFocus={(e) => e.target.select()} addonAfter={addonAfter} min={MIN} max={MAX} />
      </Form.Item>
    );
  };

  const renderInputItem = (label: string, prop: InputStringKeys) => {
    const MAX_LENGTH = 500;

    return (
      <Form.Item
        name={prop}
        label={`${label}:`}
        rules={[
          {
            type: 'string',
            max: MAX_LENGTH,
          },
        ]}
      >
        <Input onFocus={(e) => e.target.select()} maxLength={MAX_LENGTH} />
      </Form.Item>
    );
  };

  return (
    <StickyCard
      title={<CharacterCardTitle title="Editing form" />}
      extra={
        <CharacterEditActions
          character={character}
          form={form}
          toggleEdit={toggleEdit}
          onReset={() => {
            form.setFieldsValue(cloneDeep(character));
            forceUpdate();
          }}
        />
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={isTablet ? 12 : 24}>
            {renderInputItem('Name', 'name')}
            {renderInputItem('Birth Year', 'birth_year')}
            {renderInputNumberItem('Height', 'height', 'cm')}
            {renderInputNumberItem('Mass', 'mass', 'kg')}
            {renderInputItem('Hair Color', 'hair_color')}
          </Col>

          <Col span={isTablet ? 12 : 24}>
            {renderInputItem('Skin Color', 'skin_color')}
            {renderInputItem('Eye Color', 'eye_color')}
            <Form.Item label="Homeworld:" {...getValidateState(queries.homeworldQ, planets)} name="homeworld">
              {queries.homeworldQ.isLoading ? loader : <PlanetAutoComplete planets={planets} form={form} />}
            </Form.Item>

            <Form.Item<Character> name="gender" label="Gender:">
              <Select>
                <Select.Option value={Gender.male}>Male</Select.Option>
                <Select.Option value={Gender.female}>Female</Select.Option>
                <Select.Option value={Gender.unknown}>Unknown</Select.Option>
                <Select.Option value={Gender.none}>N/A</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            {renderSelectItem('Films', 'films', queries.filmsQ, films)}
            {renderSelectItem('Species', 'species', queries.speciesQ, species)}
            {renderSelectItem('Vehicles', 'vehicles', queries.vehiclesQ, vehicles)}
            {renderSelectItem('Star Ships', 'starships', queries.starshipsQ, starships)}
          </Col>
        </Row>
      </Form>
    </StickyCard>
  );
});
