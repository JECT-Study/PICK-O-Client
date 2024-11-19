import React from 'react';
import ContentsButton, {
  ContentsButtonProps,
} from '@/components/molecules/ContentsButton/ContentsButton';
import * as S from './SearchGameList.style';

export type GameItem = Pick<
  ContentsButtonProps,
  'title' | 'mainTag' | 'subTag' | 'images'
> & {
  optionAImg?: string;
  optionBImg?: string;
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
          images={[game.optionAImg, game.optionBImg] as string[]}
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
