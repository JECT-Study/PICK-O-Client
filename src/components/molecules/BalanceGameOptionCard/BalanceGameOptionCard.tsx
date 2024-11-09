import React, { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import ImageBoxButton from '@/components/atoms/ImageBoxButton/ImageBoxButton';
import ChoiceInputButton from '@/components/atoms/ChoiceInputButton/ChoiceInputButton';
import * as S from './BalanceGameOptionCard.style';

interface BalanceGameOptionCardProps {
  option: 'A' | 'B';
  imgUrl?: string;
  imageFile: File | null;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  choiceInputProps?: ComponentPropsWithoutRef<'input'>;
  infoInputProps?: ComponentPropsWithoutRef<'input'>;
  clearInput?: boolean;
}

const BalanceGameOptionCard = ({
  option,
  imgUrl,
  imageFile,
  onImageChange,
  choiceInputProps,
  infoInputProps,
  clearInput = false,
}: BalanceGameOptionCardProps) => {
  return (
    <div css={S.imageChoiceContainer}>
      <ImageBoxButton
        imageFile={imageFile}
        imgUrl={imgUrl}
        onChange={onImageChange}
      />
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
