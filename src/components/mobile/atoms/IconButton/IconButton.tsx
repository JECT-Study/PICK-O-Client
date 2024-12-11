import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from 'react';
import * as S from './IconButton.style';

interface InteractionMiniButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  icon: React.ReactNode;
}

const IconButton = (
  { icon, onClick, ...props }: InteractionMiniButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button type="button" css={S.buttonStyle} ref={ref} {...props}>
      {icon}
    </button>
  );
};

export default forwardRef(IconButton);
