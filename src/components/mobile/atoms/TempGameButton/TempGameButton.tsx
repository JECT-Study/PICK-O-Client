import React, { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import { MobileFolder, MobileFolderCheck } from '@/assets';
import * as S from './TempGameButton.style';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  action?: 'save' | 'get';
}

const TempGameButton = (
  { action = 'save', ...attributes }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <button type="button" ref={ref} css={S.tempGameButtonStyling} {...attributes}>
    <div css={S.itemWrapper}>
      <div>{action === 'save' ? <MobileFolderCheck /> : <MobileFolder />}</div>
      <div css={S.buttonStyling}>
        {action === 'save' ? '임시저장하기' : '임시저장 불러오기'}
      </div>
    </div>
  </button>
);

export default forwardRef(TempGameButton);
