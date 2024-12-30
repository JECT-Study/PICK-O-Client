import React from 'react';
import { NormalProfile } from '@/assets';
import * as S from './MobileProfileImage.style';

export interface ProfileImageProps {
  imgUrl?: string;
  alt?: string;
  size?: 'lg' | 'sm';
}

const MobileProfileImage = ({
  imgUrl,
  alt = '프로필',
  size = 'lg',
}: ProfileImageProps) =>
  imgUrl ? (
    <img src={imgUrl} alt={alt} css={S.profileImageStyle(size)} />
  ) : (
    <NormalProfile css={S.profileImageStyle(size)} aria-label={alt} />
  );

export default MobileProfileImage;
