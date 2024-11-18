import React from 'react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { useNavigate } from 'react-router-dom';
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

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.editedAt]) {
        acc[item.editedAt] = [];
      }
      acc[item.editedAt].push(item);
      return acc;
    },
    {} as Record<string, MyBalanceGameItem[]>,
  );

  const handleItemClick = (gameId: number) => {
    navigate(`/balancegame/${gameId}`);
  };

  return (
    <div css={S.container}>
      {Object.keys(groupedItems).map((date) => (
        <div key={date} css={S.dateWrapper}>
          <span css={S.dateLabel}>{date}</span>
          <ul css={S.contentList}>
            {groupedItems[date].map((balanceGameItem) => (
              <li key={balanceGameItem.gameId} css={S.contentItem}>
                <ContentsButton
                  images={[
                    balanceGameItem.optionAImg,
                    balanceGameItem.optionBImg,
                  ]}
                  title={balanceGameItem.title}
                  mainTag={balanceGameItem.mainTagName}
                  subTag={balanceGameItem.subTag}
                  bookmarked={balanceGameItem.bookmarked}
                  showBookmark={balanceGameItem.showBookmark}
                  size="medium"
                  onClick={() => handleItemClick(balanceGameItem.gameId)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyBalanceGameList;
