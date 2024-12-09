import React, { ComponentPropsWithRef } from 'react';
import { CircleGame, CircleTalkPick } from '@/assets';
import * as S from './MobileCreateButton.style';

interface MobileCreateButtonProps extends ComponentPropsWithRef<'button'> {
  imageType: 'talkpick' | 'game';
  label: string;
  onClick?: () => void;
}

const MobileCreateButton = ({
  imageType,
  label,
  onClick,
  ...attributes
}: MobileCreateButtonProps) => {
  let ImageComponent;
  switch (imageType) {
    case 'talkpick':
      ImageComponent = CircleTalkPick;
      break;
    case 'game':
      ImageComponent = CircleGame;
      break;
    default:
      return null;
  }

  return (
    <button
      type="button"
      css={S.categoryButtonBaseStyle(imageType)}
      onClick={onClick}
      {...attributes}
    >
      <span css={S.labelStyle}>{label}</span>
      <ImageComponent css={S.imgWrap} />
    </button>
  );
};

export default MobileCreateButton;
