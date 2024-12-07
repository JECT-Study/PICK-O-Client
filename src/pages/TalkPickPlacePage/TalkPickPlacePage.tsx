import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BestTalkPick from '@/components/molecules/BestTalkPick/BestTalkPick';
import TalkPickListSection from '@/components/organisms/TalkPickListSection/TalkPickListSection';
import { useBestTalkPickListQuery } from '@/hooks/api/talk-pick/useBestTalkPickListQuery';
import { useTalkPickListQuery } from '@/hooks/api/talk-pick/useTalkPickListQuery';
import * as S from './TalkPickPlacePage.style';

const TalkPickPlacePage = () => {
  const [selectedValue, setSelectedValue] = useState<{
    field: string;
    order: 'asc' | 'desc';
  }>({
    field: 'views',
    order: 'desc',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') ?? '1', 10) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...Object.fromEntries(prevParams.entries()),
      page: currentPage.toString(),
    }));
  }, [currentPage, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const { bestTalkPick } = useBestTalkPickListQuery();
  const { talkPickList } = useTalkPickListQuery({
    page: currentPage - 1,
    size: 20,
    sort: `${selectedValue.field},${selectedValue.order}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedValue]);

  return (
    <div css={S.talkPickPlaceStyling}>
      <div css={S.bestTalkPickStyling}>
        <div css={S.bestTalkPickTextWrapper}>
          <div css={S.bestTalkPickSubTitle}>
            모두가 톡커도 되고 픽커도 되는 (두둥탁)
          </div>
          <div css={S.bestTalkPickTitle}>톡&픽 플레이스</div>
        </div>
        <BestTalkPick bestTalkPick={bestTalkPick} />
      </div>
      <TalkPickListSection
        talkPickList={talkPickList}
        selectedValue={selectedValue}
        setToggleValue={setSelectedValue}
        selectedPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default TalkPickPlacePage;
