import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from 'react';
import * as S from './InteractionButton.style';

interface InteractionButtonProps extends ComponentPropsWithoutRef<'button'> {
  buttonLabel: string;
  icon: React.ReactNode;
  iconLabel: string;
}

const InteractionButton = (
  { buttonLabel, icon, iconLabel, ...props }: InteractionButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button type="button" css={S.buttonStyle} ref={ref} {...props}>
      <div css={S.itemWrapper}>
        <div css={S.buttonLabelStyle}>{buttonLabel}</div>
        <div css={S.iconWrapper}>
          <div css={S.iconStyle}>{icon}</div>
          <span css={S.iconLabelStyle}>{iconLabel}</span>
        </div>
      </div>
    </button>
  );
};

export default forwardRef(InteractionButton);
