import { COLORS } from '@app/styles/constants';
import { Typography } from 'antd';
import { useCallback, useMemo } from 'react';
const { Text } = Typography;

export function useHighlightCallback() {
  return useCallback((text: string, search: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text style={{ color: COLORS.secondary, fontSize: 'inherit' }} key={index}>
          {part}
        </Text>
      ) : (
        part
      ),
    );
  }, []);
}

export function useHighlightSearch(text: string, search: string) {
  const highlight = useHighlightCallback();
  return useMemo(() => highlight(text, search), [highlight, text, search]);
}
