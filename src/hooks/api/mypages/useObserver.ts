import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type InfiniteQueryType = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

export const useObserver = (queries: Record<string, InfiniteQueryType>) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView) {
      Object.values(queries).forEach(
        ({ hasNextPage, isFetchingNextPage, fetchNextPage }) => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        },
      );
    }
  }, [inView, queries]);

  const isFetchingAnyNextPage = Object.values(queries).some(
    ({ isFetchingNextPage }) => isFetchingNextPage,
  );

  return { ref, isFetchingAnyNextPage };
};
