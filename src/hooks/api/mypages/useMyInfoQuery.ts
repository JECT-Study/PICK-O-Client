import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/api/mypages';
import { SideBar } from '@/types/mypages';
import { Id } from '@/types/api';

export const useMyInfoQuery = (memberId: Id) => {
  const { data, isLoading } = useQuery<SideBar>({
    queryKey: ['memberInfo', memberId],
    queryFn: () => getMyInfo(memberId),
    enabled: !!memberId,
  });

  const memberInfo = {
    id: data?.id || 0,
    nickname: data?.nickname || '',
    profileImageUrl: data?.profileImageUrl || '',
    createdAt: data?.createdAt || '',
    postsCount: data?.postsCount || 0,
    bookmarkedPostsCount: data?.bookmarkedPostsCount || 0,
  };

  return { memberInfo, isLoading };
};
