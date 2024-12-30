import React from 'react';
import Label from '@/components/atoms/Label/Label';
import * as S from './LabelCountBox.style';

export interface LabelCountBoxProps {
  label: string;
  count: number;
}

const LabelCountBox = ({ label, count }: LabelCountBoxProps) => (
  <div css={S.containerStyle} aria-label={`${label} 정보`}>
    <Label css={S.labelStyle}>{label}</Label>
    <span css={S.countStyle} aria-label={`${label} 카운트`}>
      {count}
    </span>
  </div>
);

export default LabelCountBox;
