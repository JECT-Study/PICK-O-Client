import React, { useState } from 'react';
import { AngleSmallDown } from '@/assets';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import Button from '@/components/atoms/Button/Button';
import CategoryBar from '@/components/molecules/CategoryBar/CategoryBar';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { GameContent } from '@/types/game';
import * as S from './BalanceGameList.style';

export interface ContentListProps {
  contents: GameContent[];
  selectedValue: 'views' | 'createdAt';
  setSelectedValue: React.Dispatch<React.SetStateAction<'views' | 'createdAt'>>;
  activeTab: '인기' | '커플' | '취향' | '월드컵';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'인기' | '커플' | '취향' | '월드컵'>
  >;
}

const BalanceGameList = ({
  contents,
  selectedValue,
  setSelectedValue,
  activeTab,
  setActiveTab,
}: ContentListProps) => {
  const [visibleItems, setVisibleItems] = useState<number>(4);

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 6, contents.length));
  };

  return (
    <div css={S.containerStyle}>
      <div css={S.titleWrapStyle}>
        <div>주제별 밸런스 게임</div>
        <ToggleGroup selectedValue={selectedValue} onClick={setSelectedValue} />
      </div>
      <div css={S.barStyle}>
        <CategoryBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div css={S.contentStyle}>
        {contents.slice(0, visibleItems).map((content) => (
          <ContentsButton
            key={content.id}
            images={content.images}
            title={content.title}
            mainTag={content.mainTag}
            subTag={content.subTag}
            bookmarked={content.bookmarkState || false}
          />
        ))}
        {visibleItems < contents.length && (
          <div css={S.loadMoreWrapperStyle}>
            <Button
              variant="outlineShadow"
              size="large"
              onClick={handleLoadMore}
              iconRight={<AngleSmallDown />}
            >
              더보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceGameList;
