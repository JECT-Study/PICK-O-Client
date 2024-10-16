import { useQuery } from '@tanstack/react-query';
import { getTalkPickResults } from '@/api/search';
import { TalkPickResult } from '@/types/search';

export const useTalkPickResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: string,
  enabledCondition: boolean,
) => {
  const {
    data: talkPickResults,
    isLoading,
    isError,
  } = useQuery<TalkPickResult>({
    queryKey: ['talkPickResults', query, page, size, sort],
    queryFn: () => getTalkPickResults(query, page, size, sort),
    enabled: enabledCondition,
  });

  const content = talkPickResults?.content || [];
  const totalPages = talkPickResults?.totalPages || 0;
  console.log('톡픽 쿼리 실행 Query :', { content });

  return { content, totalPages, isLoading, isError };
};
