import React from 'react';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import SearchGameList, {
  GameItem,
} from '@/components/molecules/SearchGameList/SearchGameList';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH } from '@/constants/path';
import * as S from './SearchGameResult.style';

interface SearchGameResultProps {
  gameList: GameItem[];
  keyword: string;
}

const SearchGameResult = ({ gameList, keyword }: SearchGameResultProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleButtonClick = () => {
    navigate(`/result/${PATH.SEARCH.GAME}?query=${searchParams.get('query')}`);
  };

  const hasResults = gameList.length > 0;

  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>밸런스게임</div>
        <MoreButton onClick={handleButtonClick} />
      </div>
      {hasResults ? (
        <div css={S.contentWRapper}>
          <SearchGameList gameList={gameList} keyword={keyword} />
        </div>
      ) : (
        <div css={S.noResultsWrapper}>
          <NoResultsMessage searchChoice="default" keyword={keyword} />
        </div>
      )}
    </div>
  );
};

export default SearchGameResult;
