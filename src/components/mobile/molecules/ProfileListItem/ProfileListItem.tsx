import React from 'react';
import MobileProfileImage from '@/components/mobile/atoms/MobileProfileImage/MobileProfileImage';
import * as S from './ProfileListItem.style';

export interface ProfileListItemProps {
  title: string;
  imgUrl: string;
}

const ProfileListItem = ({ title, imgUrl }: ProfileListItemProps) => (
  <div css={S.containerStyle}>
    <span css={S.titleStyle}>{title}</span>
    <MobileProfileImage imgUrl={imgUrl} alt="image" size="sm" />
  </div>
);

export default ProfileListItem;
