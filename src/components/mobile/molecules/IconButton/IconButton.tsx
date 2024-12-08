import React from 'react';
import Label from '@/components/atoms/Label/Label';
import * as S from './IconButton.style';

export interface IconButtonProps {
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const IconButton = ({
  activeIcon,
  inactiveIcon,
  label,
  isActive = false,
  onClick,
}: IconButtonProps) => (
  <button
    css={[S.iconButtonStyle, isActive && S.activeStyle]}
    onClick={onClick}
  >
    {isActive ? activeIcon : inactiveIcon}
    <Label css={S.labelStyle}>{label}</Label>
  </button>
);

export default IconButton;
