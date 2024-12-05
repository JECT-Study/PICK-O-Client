import React, { useState } from 'react';
import { AngleSmallDown } from '@/assets';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import Button from '@/components/atoms/Button/Button';
import CategoryBar from '@/components/molecules/CategoryBar/CategoryBar';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { GameContent } from '@/types/game';
import { useNavigate } from 'react-router-dom';
import * as S from './BalanceGameList.style';

export interface ContentListProps {
  contents: GameContent[];
  selectedValue: { fileId: string; order: 'asc' | 'desc' };
  setSelectedValue: React.Dispatch<
    React.SetStateAction<{ fileId: string; order: 'asc' | 'desc' }>
  >;
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
  const navigate = useNavigate();

  const handleItemClick = (gameId: number) => {
    if (!gameId || gameId <= 0) {
      alert('유효하지 않은 게임 ID입니다.');
      return;
    }
    navigate(`/balancegame/${gameId}`);
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 6, contents.length));
  };

  const handleToggleChange = (value: {
    fileId: string;
    order: 'asc' | 'desc';
  }) => {
    setSelectedValue(value);
  };

  return (
    <div css={S.containerStyle}>
      <div css={S.titleWrapStyle}>
        <div>주제별 밸런스 게임</div>
        <ToggleGroup
          selectedValue={selectedValue}
          onClick={handleToggleChange}
        />
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
            onClick={() => handleItemClick(content.id)}
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
