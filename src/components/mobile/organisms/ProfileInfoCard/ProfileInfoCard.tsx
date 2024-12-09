import React from 'react';
import MobileProfileImage from '@/components/mobile/atoms/MobileProfileImage/MobileProfileImage';
import LabelCountBox from '@/components/mobile/molecules/LabelCountBox/LabelCountBox';
import MenuTap from '@/components/atoms/MenuTap/MenuTap';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './ProfileInfoCard.style';

export interface ProfileInfoCardProps {
  imgUrl?: string;
  username: string;
  postCount: number;
  bookmarkCount: number;
  menuData: { label: string; onClick: () => void }[];
}

const ProfileInfoCard = ({
  imgUrl,
  username,
  postCount,
  bookmarkCount,
  menuData,
}: ProfileInfoCardProps) => (
  <div css={S.containerStyle}>
    <div css={S.profileImageWrapper}>
      <MobileProfileImage
        imgUrl={imgUrl}
        alt={`${username}의 프로필`}
        size="lg"
      />
    </div>
    <div css={S.userInfoWrapper}>
      <div css={S.userInfoBox}>
        <div css={S.userBadgeStyle} />
        <span css={S.usernameStyle}>{username}</span>
      </div>
      <div css={S.countBoxWrapper}>
        <LabelCountBox label="작성" count={postCount} />
        <Divider length={30} />
        <LabelCountBox label="저장" count={bookmarkCount} />
      </div>
    </div>
    <div css={S.menuTapWrapper}>
      <MenuTap menuData={menuData} />
    </div>
  </div>
);

export default ProfileInfoCard;
