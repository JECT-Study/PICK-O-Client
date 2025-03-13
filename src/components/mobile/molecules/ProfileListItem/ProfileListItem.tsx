import React, { ComponentPropsWithoutRef, useMemo } from 'react';
import MobileProfileImage from '@/components/mobile/atoms/MobileProfileImage/MobileProfileImage';
import {
  RandomBlackFrame,
  RandomBlueFrame,
  RandomGreenFrame,
  RandomPinkFrame,
  RandomPurpleFrame,
  RandomTealFrame,
} from '@/assets';
import { Link } from 'react-router-dom';
import * as S from './ProfileListItem.style';

const randomImages = [
  RandomBlackFrame,
  RandomBlueFrame,
  RandomGreenFrame,
  RandomPinkFrame,
  RandomPurpleFrame,
  RandomTealFrame,
];

const useRandomImage = () => {
  return useMemo(() => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
  }, []);
};

export interface ProfileListItemProps
  extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  title: string;
  imgUrl?: string;
  to: string;
}

const ProfileListItem = ({
  title,
  imgUrl,
  ...restProps
}: ProfileListItemProps) => {
  const randomImage = useRandomImage();
  const displayImgUrl = imgUrl ?? randomImage;

  return (
    <Link css={S.containerStyle} {...restProps}>
      <span css={S.titleStyle}>{title}</span>
      <MobileProfileImage
        imgUrl={displayImgUrl}
        alt={`${title}님의 프로필 이미지`}
        size="sm"
      />
    </Link>
  );
};

export default ProfileListItem;
