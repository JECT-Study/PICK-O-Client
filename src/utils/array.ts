export const createRangeArray = (currentPage: number, maxPage: number) => {
  const pagesPerGroup = 5;
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, maxPage);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
};

export const createArrayFromCommaString = (str: string): string[] => {
  return str.split(',');
};
