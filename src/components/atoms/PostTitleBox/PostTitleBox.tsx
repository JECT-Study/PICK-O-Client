/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import * as S from './PostTitleBox.style';

const PostTitleBox = (props: any, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div css={S.boxStyle}>
      <input
        css={S.inputStyle}
        type="text"
        placeholder="제목을 입력하세요."
        maxLength={50}
        ref={ref}
        {...props}
      />
    </div>
  );
};
export default forwardRef(PostTitleBox);
