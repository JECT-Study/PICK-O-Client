import React from 'react';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
import ProfileLabel from '@/components/atoms/ProfileLabel/ProfileLabel';
import SideBox from '@/components/molecules/SideBox/SideBox';
import ActionBox from '@/components/molecules/ActionBox/ActionBox';
import * as S from './SideBar.style';

export interface SideBarProps {
  nickname: string;
  postsCount: number;
  bookmarkedPostsCount: number;
  profileImageUrl?: string;
  isLoading?: boolean;
}

const SideBar = ({
  nickname,
  profileImageUrl,
  postsCount,
  bookmarkedPostsCount,
  isLoading = false,
}: SideBarProps) => {
  const profileIconInteraction = profileImageUrl ? 'custom' : 'default';

  return (
    <div css={S.sidebarContainer(isLoading)}>
      {isLoading ? (
        <div />
      ) : (
        <div css={S.profileWrapper}>
          <ProfileIcon
            interaction={profileIconInteraction}
            imgUrl={profileImageUrl}
            size="large"
          />
          <div css={S.profileLabelBox}>
            <ProfileLabel nickname={nickname} />
          </div>
          <div css={S.sideBoxWrapper}>
            <SideBox
              postsCount={postsCount}
              bookmarkedPostsCount={bookmarkedPostsCount}
            />
          </div>
          <div css={S.actionWrapper}>
            <ActionBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
