import {
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

/**
 * 2개의 제네릭:
 *  - TQueryFnData: queryFn이 실제 API에서 받아오는 원본 타입
 *  - TData: 최종 변환(Select) 이후에 사용할 UI 모델 타입
 */

/**
 * 기본 React Query 무한 쿼리 옵션에서
 * 내부에서 이미 설정하는 필드( queryKey, initialPageParam, getNextPageParam )를 제거한 타입.
 */
type MyInfiniteUserOptions<TQueryFnData, TData> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, Error, TData>,
  'queryKey' | 'initialPageParam' | 'getNextPageParam'
>;

/**
 * @param queryKey - readonly string[] (예: ['gameBookmark'] as const)
 * @param queryFn - 페이지 번호(pageParam)를 받아 API 호출 후 TQueryFnData를 반환하는 함수
 * @param selectFn - (선택) InfiniteData<TQueryFnData>를 TData로 변환하는 함수
 * @param options - 사용자가 넘길 수 있는 옵션 (enabled, staleTime 등), 내부 필드들은 Omit됨
 * @returns UseInfiniteQueryResult<TData, Error>
 */
export const useInfiniteScroll = <
  TQueryFnData extends { last: boolean; number: number },
  TData = TQueryFnData,
>(
  queryKey: readonly string[],
  queryFn: (ctx: { pageParam?: number }) => Promise<TQueryFnData>,
  selectFn?: (data: InfiniteData<TQueryFnData>) => TData,
  options?: MyInfiniteUserOptions<TQueryFnData, TData>,
): UseInfiniteQueryResult<TData, Error> => {
  return useInfiniteQuery<TQueryFnData, Error, TData>({
    queryKey,
    queryFn: async (context) => {
      const actualPage =
        typeof context.pageParam === 'number' ? context.pageParam : 0;
      return queryFn({ pageParam: actualPage });
    },
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    initialPageParam: 0,
    select: selectFn,
    ...options,
  });
};
