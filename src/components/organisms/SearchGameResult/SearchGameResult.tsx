import React from 'react';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import SearchGameList, {
  GameItem,
} from '@/components/molecules/SearchGameList/SearchGameList';
import * as S from './SearchGameResult.style';

interface SearchGameResultProps {
  gameList: GameItem[];
}

const SearchGameResult = ({ gameList }: SearchGameResultProps) => {
  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>밸런스게임</div>
        <MoreButton />
      </div>
      <div>
        <SearchGameList gameList={gameList} />
      </div>
    </div>
  );
};

export default SearchGameResult;
