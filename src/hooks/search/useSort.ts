import { useState } from 'react';

interface SortOption {
  fileId: string;
  order: 'asc' | 'desc';
}

const useSort = (
  defaultSort: SortOption = { fileId: 'views', order: 'desc' },
) => {
  const [sort, setSort] = useState<SortOption>(defaultSort);

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
  };

  return { sort, handleSortChange };
};

export default useSort;
