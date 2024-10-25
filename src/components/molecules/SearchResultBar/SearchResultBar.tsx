import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import SearchBar from '@/components/atoms/SearchBar/SearchBar';
import * as S from './SearchResultBar.style';

export interface SearchResultBarProps {
  selectedValue: 'all' | 'talkpick' | 'game';
  onClick?: (value: 'all' | 'talkpick' | 'game') => void;
  onSearch: (query: string) => void;
}

const SearchResultBar = ({
  selectedValue,
  onClick,
  onSearch,
}: SearchResultBarProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const resultButtons: { value: 'all' | 'talkpick' | 'game'; label: string }[] =
    [
      { value: 'all', label: '전체' },
      { value: 'talkpick', label: '톡픽' },
      { value: 'game', label: '밸런스 게임' },
    ];

  return (
    <div css={S.searchBarContainerStyling}>
      <SearchBar
        onInputChange={handleInputChange}
        onSearchClick={handleSearchClick}
        value={inputValue}
      />
      <div css={S.btnWrapperStyling}>
        {resultButtons.map((button) => (
          <Button
            key={button.value}
            size="large"
            variant="outlinePrimary"
            css={[selectedValue === button.value && S.selectedButtonStyling]}
            onClick={() => onClick?.(button.value)}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchResultBar;
