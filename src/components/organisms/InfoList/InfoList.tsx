import React from 'react';
import InfoBox, { InfoBoxProps } from '@/components/molecules/InfoBox/InfoBox';
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

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.editedAt]) {
        acc[item.editedAt] = [];
      }
      acc[item.editedAt].push(item);
      return acc;
    },
    {} as Record<string, InfoItem[]>,
  );

  const handleItemClick = (id: number) => {
    navigate(`/talkpick/${id}`);
  };

  return (
    <div css={S.container}>
      {Object.keys(groupedItems).map((editedAt) => (
        <div key={editedAt} css={S.dateWrapper}>
          <span css={S.dateLabel}>{editedAt}</span>
          <ul css={S.infoList}>
            {groupedItems[editedAt].map((infoItem) => (
              <li key={infoItem.id} css={S.infoItem}>
                <InfoBox
                  title={infoItem.title}
                  prefix={infoItem.prefix}
                  commentContent={infoItem.commentContent}
                  commentCount={infoItem.commentCount}
                  bookmarks={infoItem.bookmarks}
                  onClick={() => handleItemClick(infoItem.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InfoList;
