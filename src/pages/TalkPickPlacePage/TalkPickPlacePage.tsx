import React, { useState, useEffect } from 'react';
import usePagination from '@/hooks/search/usePagination';
import BestTalkPick from '@/components/molecules/BestTalkPick/BestTalkPick';
import TalkPickListSection from '@/components/organisms/TalkPickListSection/TalkPickListSection';
import { useBestTalkPickListQuery } from '@/hooks/api/talk-pick/useBestTalkPickListQuery';
import { useTalkPickListQuery } from '@/hooks/api/talk-pick/useTalkPickListQuery';
import { ToggleGroupValue } from '@/types/toggle';
import * as S from './TalkPickPlacePage.style';

const TalkPickPlacePage = () => {
  const { page, handlePageChange } = usePagination();
  const [selectedValue, setSelectedValue] = useState<ToggleGroupValue>({
    field: 'views',
    order: 'desc',
  });

  const { bestTalkPick } = useBestTalkPickListQuery();
  const { talkPickList } = useTalkPickListQuery({
    page: page - 1,
    size: 20,
    sort: `${selectedValue.field},${selectedValue.order}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, selectedValue]);

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
        selectedPage={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default TalkPickPlacePage;
