import React, { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import * as S from './CitationBox.style';

export interface CitationBoxProps extends ComponentPropsWithRef<'input'> {}

const CitationBox = (
  props: CitationBoxProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div css={S.boxStyle}>
      <div css={S.boxTitleStyle}>출처</div>
      <input css={S.inputStyle} type="text" ref={ref} {...props} />
    </div>
  );
};

export default forwardRef(CitationBox);
