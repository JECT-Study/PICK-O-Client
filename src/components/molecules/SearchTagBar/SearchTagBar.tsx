import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import SearchBar from '@/components/atoms/SearchBar/SearchBar';
import { KEYWORD_TAG } from '@/constants/keywordTag';
import * as S from './SearchTagBar.style';

interface SearchTagBarProps {
  onSearch: (query: string) => void;
  isMobile?: boolean;
}

const SearchTagBar = ({ onSearch, isMobile = false }: SearchTagBarProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return isMobile ? (
    <SearchBar
      isMobile
      onInputChange={handleInputChange}
      onSearchClick={handleSearchClick}
      value={inputValue}
    />
  ) : (
    <div css={S.searchBarContainerStyling}>
      <SearchBar
        onInputChange={handleInputChange}
        onSearchClick={handleSearchClick}
        value={inputValue}
      />
      <div css={S.btnWrapperStyling}>
        {KEYWORD_TAG.map((keyWord) => (
          <Button key={keyWord} size="large" variant="outlinePrimary">
            #{keyWord}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchTagBar;
