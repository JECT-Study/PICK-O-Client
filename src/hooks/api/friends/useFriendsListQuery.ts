import { useQuery } from '@tanstack/react-query';
import { FriendsList } from '@/types/friends';
import { getFriendsList } from '@/api/friends';

export const useFriendsListQuery = () => {
  const { data: friendsList } = useQuery<FriendsList>({
    queryKey: ['friends'],
    queryFn: getFriendsList,
  });
  return { friendsList };
};
