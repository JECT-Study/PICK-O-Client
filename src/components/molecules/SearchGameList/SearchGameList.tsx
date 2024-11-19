import React from 'react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleItemClick = (gameId: number) => {
    navigate(`/balancegame/${gameId}`);
  };

  return (
    <div css={S.container}>
      {gameList.map((game) => (
        <ContentsButton
          key={game.title}
          images={[game.optionAImg, game.optionBImg]}
          title={game.title}
          mainTag={game.mainTag}
          subTag={game.subTag}
          showBookmark={false}
          size="small"
          keyword={keyword}
          onClick={() => handleItemClick(game.id)}
        />
      ))}
    </div>
  );
};

export default SearchGameList;
