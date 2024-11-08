import { useQuery } from '@tanstack/react-query';
import { getTalkPickResults } from '@/api/search';
import { TalkPickResult } from '@/types/search';

export const useTalkPickResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: string,
) => {
  const { data: talkPickResults, isLoading } = useQuery<TalkPickResult>({
    queryKey: ['talkPickResults', query, page, size, sort],
    queryFn: () => getTalkPickResults(query, page, size, sort),
  });

  const content = talkPickResults?.content || [];
  const totalPages = talkPickResults?.totalPages || 0;

  return { content, totalPages, isLoading };
};
