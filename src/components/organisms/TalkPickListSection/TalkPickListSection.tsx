import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { TalkPickBubble } from '@/assets';
import { generatePageNumbers } from '@/utils/pagination';
import { TalkPickListPagination } from '@/types/talk-pick';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import Button from '@/components/atoms/Button/Button';
import Pagination from '@/components/atoms/Pagination/Pagination';
import TalkPickList from '@/components/molecules/TalkPickList/TalkPickList';
import * as S from './TalkPickListSection.style';

export interface TalkPickListProps {
  talkPickList?: TalkPickListPagination;
  selectedValue: string;
  setToggleValue: React.Dispatch<React.SetStateAction<string>>;
  selectedPage: number;
  handlePageChange: (page: number) => void;
}

const TalkPickListSection = ({
  talkPickList,
  selectedValue,
  setToggleValue,
  selectedPage,
  handlePageChange,
}: TalkPickListProps) => {
  const accessToken = useNewSelector(selectAccessToken);

  const navigate = useNavigate();
  const totalPages = talkPickList?.totalPages ?? 0;
  const pages = generatePageNumbers(totalPages);

  const handleCreatePostButton = () => {
    if (accessToken) {
      navigate('/post/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <div css={S.talkPickListContainer}>
      <div css={S.talkPickBtnWrapper}>
        <ToggleGroup selectedValue={selectedValue} onClick={setToggleValue} />
        <div css={S.talkPickWriteBtnWrapper}>
          <TalkPickBubble />
          <Button
            variant="primary"
            size="large"
            css={S.talkPickWriteBtn}
            onClick={handleCreatePostButton}
          >
            작성하기
          </Button>
        </div>
      </div>
      <div css={S.talkPickListWrapper}>
        <TalkPickList talkPickList={talkPickList?.content} />
      </div>
      <Pagination
        pages={pages}
        selected={selectedPage}
        maxPage={totalPages}
        onChangeNavigate={handlePageChange}
      />
    </div>
  );
};

export default TalkPickListSection;
