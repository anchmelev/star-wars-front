import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { COLORS } from './styles/constants';

export const appTheme: ThemeConfig = {
  hashed: false,
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: COLORS.primary,
    borderRadius: 6,
  },
};
