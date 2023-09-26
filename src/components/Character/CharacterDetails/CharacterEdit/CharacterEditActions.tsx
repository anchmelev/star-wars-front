import React, { useCallback, useState } from 'react';
import { Button, FormInstance, Popconfirm, Space, message } from 'antd';
import { CheckOutlined, CloseOutlined, RollbackOutlined } from '@ant-design/icons';
import { useUnload } from '@app/hooks/useUnload';
import { ConfirmNavigation } from '@app/components/ConfirmNavigation/ConfirmNavigation';
import { Character } from '@app/store/slices/characterSlice/types';
import { useAppDispatch } from '@app/hooks/storeHooks';
import { actions } from '@app/store/slices/rootReducer';
import { useResponsive } from '@app/hooks/useResponsive';
import isEqual from 'lodash/isEqual';

interface CharacterViewProps {
  toggleEdit: () => void;
  onReset: () => void;
  character: Character;
  form: FormInstance<Character>;
}

export const CharacterEditActions: React.FC<CharacterViewProps> = ({ character, form, toggleEdit, onReset }) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { isTablet } = useResponsive();

  const dispatch = useAppDispatch();

  const isChanged = useCallback(() => !isEqual(character, form.getFieldsValue(true)), [character, form]);

  const handleSave = async () => {
    if (isChanged()) {
      try {
        const newCharacter = form.getFieldsValue(true);
        await dispatch(actions.character.updateCharacter(newCharacter));
        message.success('Changes saved successfully');
        toggleEdit();
      } catch (error) {
        message.error('Failed to save changes');
      }
    } else {
      toggleEdit();
    }
  };

  const handleCancel = () => {
    if (isChanged()) {
      setShowCancelConfirm(true);
    } else {
      toggleEdit();
    }
  };

  const handleReset = () => {
    if (isChanged()) {
      setShowResetConfirm(true);
    } else {
      message.info({ key: 'resetCharacter', content: 'No changes' });
    }
  };

  const handleConfirmReset = () => {
    onReset();
    message.success('Changes reset successfully');
    setShowResetConfirm(false);
  };

  useUnload(
    (e) => {
      if (isChanged()) {
        e.preventDefault();
        e.returnValue = '';
      }
    },
    [isChanged],
  );

  return (
    <>
      <ConfirmNavigation shouldBlock={isChanged} />
      <Space>
        <Popconfirm
          title="Are you sure you want to cancel your changes?"
          open={showCancelConfirm}
          onConfirm={toggleEdit}
          onCancel={() => setShowCancelConfirm(false)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="dashed" icon={<CloseOutlined />} onClick={handleCancel}>
            {isTablet && 'Cancel'}
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Are you sure you want to reset your changes?"
          open={showResetConfirm}
          onConfirm={handleConfirmReset}
          onCancel={() => setShowResetConfirm(false)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="dashed" icon={<RollbackOutlined />} onClick={handleReset}>
            {isTablet && 'Reset'}
          </Button>
        </Popconfirm>

        <Button type="primary" icon={<CheckOutlined />} onClick={handleSave}>
          {isTablet && 'Save'}
        </Button>
      </Space>
    </>
  );
};
