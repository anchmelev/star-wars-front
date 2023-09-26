import React, { useState } from 'react';
import { Button, Descriptions, Popconfirm, Space, Tooltip, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useResponsive } from '@app/hooks/useResponsive';
import { StickyCard } from '../CharacterDetails.style';
import { EditOutlined } from '@ant-design/icons';
import { Character, CharacterLink } from '@app/store/slices/characterSlice/types';
import { useAppDispatch } from '@app/hooks/storeHooks';
import { actions } from '@app/store/slices/rootReducer';
import { CharacterCardTitle } from '../CharacterCardTitle/CharacterCardTitle';
import { Page } from '@app/router/Page';
import { COLORS } from '@app/styles/constants';
import { Loading } from '@app/components/Loading/Loading';
import { CharacterLinkQueries } from '../hooks/useCharacterLinksQuery';
import { mapCharacterLink } from '../utils/mapCharacterLink';
import { UseQueryResult } from 'react-query';
import * as S from './CharacterView.style';

interface CharacterViewProps {
  queries: CharacterLinkQueries;
  character: Character;
  edited: boolean;
  toggleEdit: () => void;
}

const EMPTY_VALUE_ITEM = '—';

export const CharacterView: React.FC<CharacterViewProps> = ({ character, queries, edited, toggleEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useAppDispatch();

  const { isTablet } = useResponsive();

  const handleConfirmRollback = () => {
    dispatch(actions.character.resetCharacter({ id: character.id }));
    message.success('The character rollback successfully');
    setShowConfirm(false);
  };

  const renderTags = (query: UseQueryResult<CharacterLink[], unknown>) => {
    if (query.isLoading) {
      return <Loading ownWidth size="2em" />;
    }

    if (!query.data || query.data.length === 0) {
      return <S.Tag color={COLORS.tagColor}>{EMPTY_VALUE_ITEM}</S.Tag>;
    }

    return (
      <Space wrap>
        {query.data.map((dataItem) => {
          const link = mapCharacterLink(dataItem);

          return (
            <S.Tag key={link.value} color={COLORS.tagColor}>
              {link.label}
            </S.Tag>
          );
        })}
      </Space>
    );
  };

  const getValue = (val: string) => {
    return val || EMPTY_VALUE_ITEM;
  };

  return (
    <StickyCard
      title={<CharacterCardTitle to={Page.home} title="Character card" />}
      extra={
        <Space>
          <Popconfirm
            title="Are you sure you want to rollback the character?"
            open={showConfirm}
            onConfirm={handleConfirmRollback}
            onCancel={() => setShowConfirm(false)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={edited ? undefined : 'The character data corresponds to the original state'}>
              <Button disabled={!edited} type="dashed" icon={<RollbackOutlined />} onClick={() => setShowConfirm(true)}>
                {isTablet && 'Rollback'}
              </Button>
            </Tooltip>
          </Popconfirm>

          <Button autoFocus type="primary" icon={<EditOutlined />} onClick={toggleEdit}>
            {isTablet && 'Edit'}
          </Button>
        </Space>
      }
    >
      <Descriptions layout="vertical" column={isTablet ? 2 : 1}>
        <Descriptions.Item label="Name">
          <S.Tag color={COLORS.tagColor}>{getValue(character.name)}</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Birth Year">
          <S.Tag color={COLORS.tagColor}>{getValue(character.birth_year)}</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Height">
          <S.Tag color={COLORS.tagColor}>{getValue(character.height)} cm</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Mass">
          <S.Tag color={COLORS.tagColor}>{getValue(character.mass)} kg</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Hair Color">
          <S.Tag color={COLORS.tagColor}>{getValue(character.hair_color)}</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Skin Color">
          <S.Tag color={COLORS.tagColor}>{getValue(character.skin_color)}</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Eye Color">
          <S.Tag color={COLORS.tagColor}>{getValue(character.eye_color)}</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          <S.Tag color={COLORS.tagColor}>{getValue(character.gender)}</S.Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Homeworld">{renderTags(queries.homeworldQ)}</Descriptions.Item>
        <Descriptions.Item label="Films">{renderTags(queries.filmsQ)}</Descriptions.Item>
        <Descriptions.Item label="Species">{renderTags(queries.speciesQ)}</Descriptions.Item>
        <Descriptions.Item label="Vehicles">{renderTags(queries.vehiclesQ)}</Descriptions.Item>
        <Descriptions.Item label="Starships">{renderTags(queries.starshipsQ)}</Descriptions.Item>
      </Descriptions>
    </StickyCard>
  );
};
