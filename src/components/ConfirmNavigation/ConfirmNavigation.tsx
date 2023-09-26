import { Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

export type ConfirmNavigationProps = {
  shouldBlock: boolean | (() => boolean);
};

export const ConfirmNavigation: React.FC<ConfirmNavigationProps> = ({ shouldBlock }) => {
  const blocker = useBlocker(shouldBlock);

  const [visible, setVisible] = useState(blocker.state === 'blocked');

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const blocked = typeof shouldBlock === 'boolean' ? shouldBlock : shouldBlock();
      if (!blocked) {
        blocker.reset();
      }
    }
  }, [blocker, shouldBlock]);

  useEffect(() => {
    setVisible(blocker.state === 'blocked');
  }, [blocker.state]);

  return (
    <Modal
      title="Unsaved Changes"
      open={visible}
      onCancel={() => {
        setVisible(false);
        blocker.reset?.();
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            setVisible(false);
            blocker.proceed?.();
          }}
        >
          Yes
        </Button>,
        <Button
          key="back"
          onClick={() => {
            setVisible(false);
            blocker.reset?.();
          }}
        >
          No
        </Button>,
      ]}
    >
      <p>Are you sure you want to leave without saving your changes?</p>
    </Modal>
  );
};
