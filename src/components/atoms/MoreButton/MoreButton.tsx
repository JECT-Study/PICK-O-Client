import React, { forwardRef, ComponentPropsWithRef, ForwardedRef } from 'react';
import { More, MoreReply } from '@/assets';
import * as S from './MoreButton.style';

export interface MoreButtonProps extends ComponentPropsWithRef<'button'> {
  icon?: 'plus' | 'arrow';
}

const MoreButton = (
  { icon = 'plus', ...props }: MoreButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button type="button" ref={ref} css={S.moreButtonStyling(icon)} {...props}>
      더보기
      {icon === 'plus' ? <More /> : <MoreReply />}
    </button>
  );
};

export default forwardRef(MoreButton);
