import React, { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import * as S from './IconButton.style';

interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  icon: React.ReactNode;
}

const IconButton = (
  { icon, ...props }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button type="button" css={S.buttonStyle} ref={ref} {...props}>
      {icon}
    </button>
  );
};

export default forwardRef(IconButton);
