import { useState } from 'react';
import { ToggleGroupValue } from '@/types/toggle';

const useSort = (
  defaultSort: ToggleGroupValue = { field: 'views', order: 'desc' },
) => {
  const [sort, setSort] = useState<ToggleGroupValue>(defaultSort);

  const handleSortChange = (newSort: ToggleGroupValue) => {
    setSort(newSort);
  };

  return { sort, handleSortChange };
};

export default useSort;
