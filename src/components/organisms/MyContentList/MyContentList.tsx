import React from 'react';
import MyContentBox from '@/components/molecules/MyContentBox/MyContentBox';
import { useNavigate } from 'react-router-dom';
import * as S from './MyContentList.style';

export interface MyContentItem {
  id: number;
  editedAt: string;
  title: string;
  commentCount: number;
  bookmarks: number;
  showBookmark?: boolean;
  bookmarked?: boolean;
}

export interface MyContentListProps {
  items: MyContentItem[];
}

const MyContentList = ({ items = [] }: MyContentListProps) => {
  const navigate = useNavigate();

  const groupedItems = React.useMemo(() => {
    return items.reduce(
      (acc, item) => {
        if (!acc[item.editedAt]) {
          acc[item.editedAt] = [];
        }
        acc[item.editedAt].push(item);
        return acc;
      },
      {} as Record<string, MyContentItem[]>,
    );
  }, [items]);

  const handleItemClick = (id: number) => {
    navigate(`/talkpick/${id}`);
  };

  return (
    <div css={S.container}>
      {Object.entries(groupedItems).map(([date, contentItems]) => (
        <div key={date} css={S.dateWrapper}>
          <span css={S.dateLabel}>{date}</span>
          <ul css={S.contentList}>
            {contentItems.map((contentItem) => (
              <li key={contentItem.id} css={S.contentItem}>
                <MyContentBox
                  title={contentItem.title}
                  commentCount={contentItem.commentCount}
                  bookmarks={contentItem.bookmarks}
                  showBookmark={contentItem.showBookmark}
                  bookmarked={contentItem.bookmarked}
                  onClick={() => handleItemClick(contentItem.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyContentList;
