import { Tag, Typography, Space, Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as S from './CharacterCard.style';
import { useResponsive } from '@app/hooks/useResponsive';
import { useAppSelector } from '@app/hooks/storeHooks';
import { useNavigate } from 'react-router-dom';
import { Page } from '@app/router/Page';
import { Character } from '@app/store/slices/characterSlice/types';
import { COLORS } from '@app/styles/constants';
import { useHighlightSearch } from '@app/hooks/useHighlightSearch';

const { Text } = Typography;

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const search = useAppSelector((state) => state.character.search);
  const { isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();

  const highlightedName = useHighlightSearch(character.name, search);

  return (
    <S.CardContainer>
      <S.CardBody wrap={false}>
        <S.Cell>
          <Space direction="vertical">
            <S.MainText>
              <strong>{highlightedName}</strong>
            </S.MainText>
          </Space>
        </S.Cell>

        <S.Divider type="vertical" />

        <S.Cell>
          <Space direction="vertical">
            <Text>
              <strong>Height:</strong> <Tag color={COLORS.tagColor}>{character.height} cm</Tag>
            </Text>
            <Text>
              <strong>Mass:</strong> <Tag color={COLORS.tagColor}>{character.mass} kg</Tag>
            </Text>
          </Space>
        </S.Cell>

        {isTablet && (
          <>
            <S.Divider type="vertical" />

            <S.Cell>
              <Space direction="vertical">
                <Text>
                  <strong>Hair Color:</strong> <Tag color={COLORS.tagColor}>{character.hair_color}</Tag>
                </Text>
                <Text>
                  <strong>Skin Color:</strong> <Tag color={COLORS.tagColor}>{character.skin_color}</Tag>
                </Text>
              </Space>
            </S.Cell>
          </>
        )}

        {isDesktop && (
          <>
            <S.Divider type="vertical" />

            <S.Cell>
              <Space direction="vertical">
                <Text>
                  <strong>Eye Color:</strong> <Tag color={COLORS.tagColor}>{character.eye_color}</Tag>
                </Text>
                <Text>
                  <strong>Gender:</strong> <Tag color={COLORS.tagColor}>{character.gender}</Tag>
                </Text>
              </Space>
            </S.Cell>
          </>
        )}

        <S.Cell $ownWidth>
          <Tooltip title="Open characters" placement="left">
            <Button icon={<EditOutlined />} onClick={() => navigate(`${Page.characterDetails}/${character.id}`)} />
          </Tooltip>
        </S.Cell>
      </S.CardBody>
    </S.CardContainer>
  );
};
