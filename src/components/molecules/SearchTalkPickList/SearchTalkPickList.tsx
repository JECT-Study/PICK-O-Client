import React from 'react';
import SearchTalkPickItem, {
  SearchTalkPickItemProps,
} from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './SearchTalkPickList.style';

export interface SearchTalkPickListProps {
  searchTalkPickList: SearchTalkPickItemProps[];
  keyword: string;
}

const SearchTalkPickList = ({
  searchTalkPickList,
  keyword,
}: SearchTalkPickListProps) => {
  const navigate = useNavigate();

  const handleTalkPickClick = (talkPickId: number) => {
    navigate(`/${PATH.TALKPICK(talkPickId)}`);
  };

  return (
    <div css={S.listContainerStyle}>
      {searchTalkPickList.map((searchItem, idx) => (
        <div key={searchItem.title}>
          <SearchTalkPickItem
            key={searchItem.title}
            id={searchItem.id}
            title={searchItem.title}
            createdAt={searchItem.createdAt}
            content={searchItem.content}
            firstImgUrl={searchItem.firstImgUrl}
            keyword={keyword}
            onClick={() => handleTalkPickClick(searchItem.id)}
          />
          {idx < searchTalkPickList.length - 1 && (
            <div css={S.dividerStyle}>
              <Divider length={1065} orientation="width" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SearchTalkPickList;
