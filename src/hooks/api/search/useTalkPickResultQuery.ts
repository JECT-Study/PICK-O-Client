import { useQuery } from '@tanstack/react-query';
import { getTalkPickResults } from '@/api/search';
import { TalkPickResult } from '@/types/search';

interface SortOption {
  field: string;
  order: 'asc' | 'desc';
}

export const useTalkPickResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: SortOption,
) => {
  const sortParam = `${sort.field},${sort.order}`;

  const { data: talkPickResults, isLoading } = useQuery<TalkPickResult>({
    queryKey: ['talkPickResults', query, page, size, sortParam],
    queryFn: () => getTalkPickResults(query, page, size, sortParam),
  });

  const content = talkPickResults?.content || [];
  const totalPages = talkPickResults?.totalPages || 0;

  return { content, totalPages, isLoading };
};
