import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

export const useInfiniteScroll = <T extends { last: boolean; number: number }>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<T>,
  selectFn: (data: InfiniteData<T>) => T,
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<T, Error, T, typeof queryKey, number>({
      queryKey,
      queryFn,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      initialPageParam: 0,
      select: selectFn,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};
