import React, { ComponentPropsWithRef } from 'react';
import { CircleGame, CircleTalkPick } from '@/assets';
import * as S from './FloatingButton.style';

interface FloatingButtonProps extends ComponentPropsWithRef<'button'> {
  imageType: 'talkpick' | 'game';
  label: string;
  onClick?: () => void;
}

const FloatingButton = ({
  imageType,
  label,
  onClick,
  ...attributes
}: FloatingButtonProps) => {
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

export default FloatingButton;
