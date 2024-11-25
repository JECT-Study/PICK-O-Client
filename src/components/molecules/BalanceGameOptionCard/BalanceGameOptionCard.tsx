import React, { ComponentPropsWithoutRef } from 'react';
import ImageBoxButton from '@/components/atoms/ImageBoxButton/ImageBoxButton';
import ChoiceInputButton from '@/components/atoms/ChoiceInputButton/ChoiceInputButton';
import * as S from './BalanceGameOptionCard.style';

interface BalanceGameOptionCardProps {
  option: 'A' | 'B';
  imgUrl?: string;
  onImageChange: (file: File) => void;
  choiceInputProps?: ComponentPropsWithoutRef<'input'>;
  infoInputProps?: ComponentPropsWithoutRef<'input'>;
  clearInput?: boolean;
}

const BalanceGameOptionCard = ({
  option,
  imgUrl,
  onImageChange,
  choiceInputProps,
  infoInputProps,
  clearInput = false,
}: BalanceGameOptionCardProps) => {
  return (
    <div css={S.imageChoiceContainer}>
      <ImageBoxButton imgUrl={imgUrl} onFileSelect={onImageChange} />
      <ChoiceInputButton
        option={option}
        choiceInputProps={choiceInputProps}
        infoInputProps={infoInputProps}
        clearInput={clearInput}
      />
    </div>
  );
};

export default BalanceGameOptionCard;
