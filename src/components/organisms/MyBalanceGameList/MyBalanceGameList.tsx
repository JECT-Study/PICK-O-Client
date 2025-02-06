import React, { useMemo } from 'react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import * as S from './MyBalanceGameList.style';

export interface MyBalanceGameItem {
  gameId: number;
  editedAt: string;
  optionAImg: string;
  optionBImg: string;
  title: string;
  mainTagName: string;
  subTag: string;
  bookmarked?: boolean;
  showBookmark?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export interface MyBalanceGameListProps {
  items: MyBalanceGameItem[];
}

const MyBalanceGameList = ({ items = [] }: MyBalanceGameListProps) => {
  const navigate = useNavigate();

  const groupedItems = useMemo(() => {
    return items.reduce(
      (acc, { editedAt, ...rest }) => {
        if (!acc[editedAt]) {
          acc[editedAt] = [];
        }
        acc[editedAt].push({ editedAt, ...rest });
        return acc;
      },
      {} as Record<string, MyBalanceGameItem[]>,
    );
  }, [items]);

  const handleItemClick = (gameId: number) => {
    navigate(PATH.BALANCEGAME(gameId));
  };

  return (
    <div css={S.container}>
      {Object.keys(groupedItems).map((date) => (
        <div key={date} css={S.dateWrapper}>
          <span css={S.dateLabel}>{date}</span>
          <ul css={S.contentList}>
            {groupedItems[date].map(
              ({
                gameId,
                optionAImg,
                optionBImg,
                title,
                mainTagName,
                subTag,
                bookmarked,
                showBookmark,
              }) => (
                <li key={gameId} css={S.contentItem}>
                  <ContentsButton
                    images={[optionAImg, optionBImg]}
                    title={title}
                    mainTag={mainTagName}
                    subTag={subTag}
                    bookmarked={bookmarked}
                    showBookmark={showBookmark}
                    size="medium"
                    onClick={() => handleItemClick(gameId)}
                  />
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyBalanceGameList;
