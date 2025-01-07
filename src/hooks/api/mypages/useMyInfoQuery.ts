import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/api/mypages';
import { SideBar } from '@/types/mypages';

export const useMyInfoQuery = () => {
  const { data, isLoading } = useQuery<SideBar>({
    queryKey: ['memberInfo'],
    queryFn: () => getMyInfo(),
  });

  const memberInfo = {
    id: data?.id ?? 0,
    nickname: data?.nickname ?? '',
    profileImageUrl: data?.profileImageUrl ?? '',
    createdAt: data?.createdAt ?? '',
    postsCount: data?.postsCount ?? 0,
    bookmarkedPostsCount: data?.bookmarkedPostsCount ?? 0,
  };

  return { memberInfo, isLoading };
};
