import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = (defaultPage = 0) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage =
    parseInt(searchParams.get('page') || `${defaultPage}`, 10) || 0;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...Object.fromEntries(prevParams.entries()),
      page: page.toString(),
    }));
  }, [page, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  return { page, handlePageChange };
};

export default usePagination;
