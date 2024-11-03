import React, { ReactNode } from 'react';
import * as S from './CategoryBarChip.style';

export interface CategoryBarChipProps {
  size?: 'large' | 'small';
  children?: ReactNode;
}

const CategoryBarChip = ({
  size = 'large',
  children,
}: CategoryBarChipProps) => (
  <div css={[S.categoryBarChipStyling, S.getStylingBySize(size)]}>
    {children}
  </div>
);

export default CategoryBarChip;
