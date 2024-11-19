import React from 'react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import * as S from './SearchGameList.style';

export type GameItem = {
  id: number;
  optionAImg: string;
  optionBImg: string;
  title: string;
  mainTag: string;
  subTag: string;
};

export interface SearchGameListProps {
  gameList: GameItem[];
  keyword: string;
}

const SearchGameList = ({ gameList, keyword }: SearchGameListProps) => {
  return (
    <div css={S.container}>
      {gameList.map((game) => (
        <ContentsButton
          key={game.title}
          optionAImg={game.optionAImg}
          optionBImg={game.optionBImg}
          title={game.title}
          mainTag={game.mainTag}
          subTag={game.subTag}
          showBookmark={false}
          size="small"
          keyword={keyword}
        />
      ))}
    </div>
  );
};

export default SearchGameList;
