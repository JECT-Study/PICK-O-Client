import React from 'react';
import ContentsButton, {
  ContentsButtonProps,
} from '@/components/molecules/ContentsButton/ContentsButton';
import * as S from './MyBalanceGameList.style';

export interface MyBalanceGameItem {
  id: number;
  editedAt: string;
  optionAImg: ContentsButtonProps['optionAImg'];
  optionBImg: ContentsButtonProps['optionBImg'];
  title: ContentsButtonProps['title'];
  mainTag: ContentsButtonProps['mainTag'];
  subTag: ContentsButtonProps['subTag'];
  bookmarked?: ContentsButtonProps['bookmarked'];
  showBookmark?: ContentsButtonProps['showBookmark'];
  size?: ContentsButtonProps['size'];
}

export interface MyBalanceGameListProps {
  items: MyBalanceGameItem[];
}

const MyBalanceGameList = ({ items = [] }: MyBalanceGameListProps) => {
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

  return (
    <div css={S.container}>
      {Object.keys(groupedItems).map((date) => (
        <div key={date} css={S.dateWrapper}>
          <span css={S.dateLabel}>{date}</span>
          <ul css={S.contentList}>
            {groupedItems[date].map((balanceGameItem) => (
              <li key={balanceGameItem.id} css={S.contentItem}>
                <ContentsButton
                  optionAImg={balanceGameItem.optionAImg}
                  optionBImg={balanceGameItem.optionBImg}
                  title={balanceGameItem.title}
                  mainTag={balanceGameItem.mainTag}
                  subTag={balanceGameItem.subTag}
                  bookmarked={balanceGameItem.bookmarked}
                  showBookmark={balanceGameItem.showBookmark}
                  size="medium"
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
