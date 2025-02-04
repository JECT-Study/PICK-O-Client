import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';
import type { ErrorMessageProps } from './ErrorMessage';

export const getTextStyling = (
  isError: Required<ErrorMessageProps>['isError'],
) =>
  css(typo.Mobile.Main.Regular_12, {
    color: isError ? color.RED : color.MAIN,
    marginTop: '4px',
  });
