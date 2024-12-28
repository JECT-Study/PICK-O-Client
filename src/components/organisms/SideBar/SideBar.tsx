import React from 'react';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
import ProfileLabel from '@/components/atoms/ProfileLabel/ProfileLabel';
import SideBox from '@/components/molecules/SideBox/SideBox';
import ActionBox from '@/components/molecules/ActionBox/ActionBox';
import * as S from './SideBar.style';

interface LoadingProps {
  isLoading: true;
}

export interface LoadedSideBarProps {
  isLoading: false;
  nickname: string;
  postsCount: number;
  bookmarkedPostsCount: number;
  profileImageUrl?: string;
}

type SideBarProps = LoadingProps | LoadedSideBarProps;

const isLoadedSideBarProps = (
  props: SideBarProps,
): props is LoadedSideBarProps => {
  return !props.isLoading;
};

const SideBar = (props: SideBarProps) => {
  const { isLoading } = props;

  if (isLoading) {
    return <div css={S.sidebarContainer(true)} />;
  }

  if (isLoadedSideBarProps(props)) {
    const { profileImageUrl, nickname, postsCount, bookmarkedPostsCount } =
      props;

    return (
      <div css={S.sidebarContainer(false)}>
        <div css={S.profileWrapper}>
          <ProfileIcon
            interaction={profileImageUrl ? 'custom' : 'default'}
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
      </div>
    );
  }

  return null;
};

export default SideBar;
