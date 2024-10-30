import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/api/mypages';
import { SideBar } from '@/types/mypages';
import { Id } from '@/types/api';

export const useMyInfoQuery = (memberId: Id) => {
  const { data: memberInfo, isLoading } = useQuery<SideBar>({
    queryKey: ['memberInfo', memberId],
    queryFn: () => getMyInfo(memberId),
    enabled: !!memberId,
  });

  return { memberInfo, isLoading };
};
