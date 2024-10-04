import React from 'react';
import ContentsButton, {
  ContentsButtonProps,
} from '@/components/molecules/ContentsButton/ContentsButton';
import * as S from './SearchGameList.style';

export type GameItem = Pick<
  ContentsButtonProps,
  'optionAImg' | 'optionBImg' | 'title' | 'mainTag' | 'subTag'
>;

export interface SearchGameListProps {
  gameList: GameItem[];
}

const SearchGameList = ({ gameList }: SearchGameListProps) => {
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
        />
      ))}
    </div>
  );
};

export default SearchGameList;
