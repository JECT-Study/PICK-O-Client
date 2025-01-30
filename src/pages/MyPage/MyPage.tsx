import React from 'react';
import SideBar from '@/components/organisms/SideBar/SideBar';
import OptionBar from '@/components/organisms/OptionBar/OptionBar';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useMyPageOptions } from '@/hooks/mypages/useMyPageOptions';
import { Outlet } from 'react-router-dom';
import ToastContainer from '@/components/atoms/ToastModal/ToastModalContainer';
import * as S from './MyPage.style';

const MyPage = () => {
  const {
    selectedGroup,
    selectedOption,
    options,
    handleGroupSelect,
    handleOptionSelect,
  } = useMyPageOptions();

  const { member, isLoading: isMemberLoading } = useMemberQuery();

  if (isMemberLoading) {
    return (
      <div css={S.pageContainer}>
        <SideBar isLoading />
        <div css={S.contentWrapper}>
          <OptionBar
            selectedGroup={selectedGroup}
            selectedOption={selectedOption}
            options={options}
            onGroupSelect={handleGroupSelect}
            onOptionSelect={handleOptionSelect}
          />
          <div css={S.contentList} />
        </div>
      </div>
    );
  }

  return (
    <div css={S.pageContainer}>
      <ToastContainer />
      <SideBar
        isLoading={false}
        nickname={member?.nickname ?? ''}
        postsCount={member?.postsCount ?? 0}
        bookmarkedPostsCount={member?.bookmarkedPostsCount ?? 0}
        profileImageUrl={member?.profileImgUrl ?? ''}
      />
      <div css={S.contentWrapper}>
        <OptionBar
          selectedGroup={selectedGroup}
          selectedOption={selectedOption}
          options={options}
          onGroupSelect={handleGroupSelect}
          onOptionSelect={handleOptionSelect}
        />
        <div css={S.contentList}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
