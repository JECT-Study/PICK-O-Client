import React, { useState } from 'react';
import { AngleSmallDown } from '@/assets';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import Button from '@/components/atoms/Button/Button';
import CategoryBar from '@/components/molecules/CategoryBar/CategoryBar';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { GameContent } from '@/types/game';
import MobileToggleGroup from '@/components/mobile/atom/MobileToggleGroup/MobileToggleGroup';
import * as S from './BalanceGameList.style';

export interface ContentListProps {
  contents: GameContent[];
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  activeTab: '인기' | '커플' | '취향' | '월드컵';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'인기' | '커플' | '취향' | '월드컵'>
  >;
  isMobile?: boolean;
}

const BalanceGameList = ({
  contents,
  selectedValue,
  setSelectedValue,
  activeTab,
  setActiveTab,
  isMobile = false,
}: ContentListProps) => {
  const [visibleItems, setVisibleItems] = useState<number>(4);

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 6, contents.length));
  };

  return (
    <div css={S.containerStyle}>
      <div css={S.titleWrapStyle}>
        <div>주제별 밸런스 게임</div>

        {isMobile ? (
          <MobileToggleGroup
            selectedValue={selectedValue}
            onClick={setSelectedValue}
          />
        ) : (
          <ToggleGroup
            selectedValue={selectedValue}
            onClick={setSelectedValue}
          />
        )}
      </div>
      <div css={S.barStyle}>
        <CategoryBar
          isMobile={isMobile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div css={S.contentStyle}>
        {contents.slice(0, visibleItems).map((content) => (
          <ContentsButton
            size={isMobile ? 'extraSmall' : 'large'}
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
              size={isMobile ? 'small' : 'large'}
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
