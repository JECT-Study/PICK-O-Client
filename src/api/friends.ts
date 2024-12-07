import { END_POINT } from '@/constants/api';
import { Friends, FriendsList } from '@/types/friends';
import { ServerResponse } from '@/types/api';
import { axiosInstance } from './interceptor';

export const postFriends = async (friendsData: Friends) => {
  const { data } = await axiosInstance.post<ServerResponse>(END_POINT.FRIENDS, {
    ...friendsData,
  });
  return data;
};

export const getFriendsList = async () => {
  const { data } = await axiosInstance.get<FriendsList>(END_POINT.FRIENDS_LIST);

  return data;
};
