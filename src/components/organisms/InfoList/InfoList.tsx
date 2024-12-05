import React, { useMemo } from 'react';
import InfoBox from '@/components/molecules/InfoBox/InfoBox';
import { useNavigate } from 'react-router-dom';
import * as S from './InfoList.style';

export interface InfoItem {
  id: number;
  editedAt: string;
  title: string;
  prefix: string;
  commentContent: string;
  commentCount: number;
  bookmarks: number;
}

export interface InfoListProps {
  items: InfoItem[];
}

const InfoList = ({ items = [] }: InfoListProps) => {
  const navigate = useNavigate();

  const groupedItems = useMemo(() => {
    return items.reduce<Record<string, InfoItem[]>>(
      (acc, { editedAt, ...rest }) => {
        if (!acc[editedAt]) {
          acc[editedAt] = [];
        }
        acc[editedAt].push({ editedAt, ...rest });
        return acc;
      },
      {},
    );
  }, [items]);

  const handleItemClick = (id: number) => {
    navigate(`/talkpick/${id}`);
  };

  return (
    <div css={S.container}>
      {Object.keys(groupedItems).map((editedAt) => (
        <div key={editedAt} css={S.dateWrapper}>
          <span css={S.dateLabel}>{editedAt}</span>
          <ul css={S.infoList}>
            {groupedItems[editedAt].map(
              ({
                id,
                title,
                prefix,
                commentContent,
                commentCount,
                bookmarks,
              }) => (
                <li key={id} css={S.infoItem}>
                  <InfoBox
                    title={title}
                    prefix={prefix}
                    commentContent={commentContent}
                    commentCount={commentCount}
                    bookmarks={bookmarks}
                    onClick={() => handleItemClick(id)}
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

export default InfoList;
