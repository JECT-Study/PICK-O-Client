import { useSearchParams } from 'react-router-dom';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  return { query, handleSearch };
};

export default useSearchQuery;
