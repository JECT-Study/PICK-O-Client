import { useQuery } from '@tanstack/react-query';
import { getTalkPickResults } from '@/api/search';
import { TalkPickResult } from '@/types/search';
import { ToggleGroupValue } from '@/types/toggle';

export const useTalkPickResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: ToggleGroupValue,
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
