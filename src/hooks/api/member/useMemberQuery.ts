import { getMember } from '@/api/member';
import { Member } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

export const useMemberQuery = () => {
  const { data: member } = useQuery<Member>({
    queryKey: ['members'],
    queryFn: () => getMember(),
  });
  return { member };
};
