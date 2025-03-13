import React, { useMemo } from 'react';
import MobileProfileImage from '@/components/mobile/atoms/MobileProfileImage/MobileProfileImage';
import {
  RandomBlackFrame,
  RandomBlueFrame,
  RandomGreenFrame,
  RandomPinkFrame,
  RandomPurpleFrame,
  RandomTealFrame,
} from '@/assets';
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

export interface ProfileListItemProps {
  title: string;
  imgUrl?: string;
}

const ProfileListItem = ({ title, imgUrl }: ProfileListItemProps) => {
  const randomImage = useRandomImage();
  const displayImgUrl = imgUrl || randomImage;

  return (
    <div css={S.containerStyle}>
      <span css={S.titleStyle}>{title}</span>
      <MobileProfileImage
        imgUrl={displayImgUrl}
        alt={`${title}님의 프로필 이미지`}
        size="sm"
      />
    </div>
  );
};

export default ProfileListItem;
