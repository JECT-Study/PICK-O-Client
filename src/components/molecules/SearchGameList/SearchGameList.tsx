import React from 'react';
import ContentsButton, {
  ContentsButtonProps,
} from '@/components/molecules/ContentsButton/ContentsButton';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import * as S from './SearchGameList.style';

export type GameItem = Pick<
  ContentsButtonProps,
  'title' | 'mainTag' | 'subTag'
> & {
  optionAImg?: string;
  optionBImg?: string;
  gameSetId: number;
};

export interface SearchGameListProps {
  gameList: GameItem[];
  keyword: string;
}

const SearchGameList = ({ gameList, keyword }: SearchGameListProps) => {
  const navigate = useNavigate();

  const handleItemClick = (gameId: number) => {
    navigate(`/${PATH.BALANCEGAME(gameId)}`);
  };

  return (
    <div css={S.container}>
      {gameList.map((game) => (
        <ContentsButton
          key={game.title}
          images={[game.optionAImg, game.optionBImg] as string[]}
          title={game.title}
          mainTag={game.mainTag}
          subTag={game.subTag}
          showBookmark={false}
          size="small"
          keyword={keyword}
          onClick={() => handleItemClick(game.gameSetId)}
        />
      ))}
    </div>
  );
};

export default SearchGameList;
