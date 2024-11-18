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

  const formattedMemberInfo: SideBar | null = data
    ? {
        ...data,
        profileImageUrl: data.profileImageUrl || '',
        postsCount: data.postsCount || 0,
        bookmarkedPostsCount: data.bookmarkedPostsCount || 0,
      }
    : null;

  return { memberInfo: formattedMemberInfo, isLoading };
};
