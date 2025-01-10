import React, { ComponentPropsWithoutRef } from 'react';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './TitleDescriptionField.style';

export interface TitleDescriptionFieldProps {
  titleProps: ComponentPropsWithoutRef<'input'>;
  subTitleProps: ComponentPropsWithoutRef<'textarea'>;
}

const TitleDescriptionField = ({
  titleProps,
  subTitleProps,
}: TitleDescriptionFieldProps) => {
  return (
    <div css={S.fieldStyling}>
      <input
        type="text"
        placeholder="제목(필수) 극악난이도 밸런스게임"
        css={S.titleStyling}
        {...titleProps}
      />
      <div css={S.dividerWrapper}>
        <Divider orientation="width" length={335} />
      </div>
      <textarea
        placeholder="ex) 둘 중 한 명과 반드시 연애해야만 한다면..."
        css={S.descriptionStyling}
        {...subTitleProps}
      />
    </div>
  );
};

export default TitleDescriptionField;
