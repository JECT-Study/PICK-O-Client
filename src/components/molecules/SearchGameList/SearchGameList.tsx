import React from 'react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import * as S from './SearchGameList.style';

export interface SearchGameListProps {
  gameData: {
    id: string;
    optionAImg: string;
    optionBImg: string;
    title: string;
    mainTag: string;
    subTag: string;
  }[];
}

const SearchGameList = ({ gameData }: SearchGameListProps) => {
  return (
    <div css={S.container}>
      {gameData.map((game) => (
        <ContentsButton
          key={game.id}
          optionAImg={game.optionAImg}
          optionBImg={game.optionBImg}
          title={game.title}
          mainTag={game.mainTag}
          subTag={game.subTag}
          showBookmark={false}
          size="small"
        />
      ))}
    </div>
  );
};

export default SearchGameList;
