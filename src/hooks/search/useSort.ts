import { useState } from 'react';

const useSort = (defaultSort = 'views') => {
  const [sort, setSort] = useState(defaultSort);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return { sort, handleSortChange };
};

export default useSort;
