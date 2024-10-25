import React from 'react';
import SearchTalkPickItem, {
  SearchTalkPickItemProps,
} from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';
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
  return (
    <div css={S.listContainerStyle}>
      {searchTalkPickList.map((searchItem, idx) => (
        <div key={searchItem.title}>
          <SearchTalkPickItem
            title={searchItem.title}
            createdAt={searchItem.createdAt}
            content={searchItem.content}
            firstImgUrl={searchItem.firstImgUrl}
            keyword={keyword}
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
