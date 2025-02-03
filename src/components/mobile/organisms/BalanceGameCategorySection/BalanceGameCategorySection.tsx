/* eslint-disable no-alert */
import React, { useCallback } from 'react';
import BalanceGameCategory from '@/components/mobile/atoms/BalanceGameCategory/BalanceGameCategory';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { useNavigate } from 'react-router-dom';
import { ERROR } from '@/constants/message';
import { GameContent } from '@/types/game';
import * as S from './BalanceGameCategorySection.style';

interface BalanceGameCategorySectionProps {
  contents: GameContent[];
  label: string;
  icon?: React.ReactNode;
}

const BalanceGameCategorySection = ({
  contents,
  label,
  icon,
}: BalanceGameCategorySectionProps) => {
  const navigate = useNavigate();

  const handleItemClick = useCallback(
    (gameId: number) => {
      if (!gameId || gameId <= 0) {
        alert(ERROR.GAME.NOT_EXIST);
        return;
      }
      navigate(`/balancegame/${gameId}`);
    },
    [navigate],
  );

  return (
    <div css={S.categoryWrapStyle}>
      <div css={S.categoryHeaderStyle}>
        <BalanceGameCategory label={label} icon={icon} />
        <MoreButton size="small" />
      </div>
      <div css={S.contentStyle}>
        {contents.slice(0, 2).map((content) => (
          <ContentsButton
            size="extraSmall"
            key={content.id}
            images={content.images}
            title={content.title}
            mainTag={content.mainTag}
            subTag={content.subTag}
            bookmarked={content.bookmarkState || false}
            onClick={() => handleItemClick(content.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BalanceGameCategorySection;
