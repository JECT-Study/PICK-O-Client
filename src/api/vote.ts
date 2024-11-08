import { END_POINT } from '@/constants/api';
import { VoteOption } from '@/types/vote';
import { Id } from '@/types/api';
import { axiosInstance } from './interceptor';

export const putTalkPickVote = async (talkPickId: Id, option: VoteOption) => {
  const response = await axiosInstance.put(END_POINT.VOTE_TALK(talkPickId), {
    voteOption: option,
  });
  return response;
};

export const postTalkPickVote = async (talkPickId: Id, option: VoteOption) => {
  const response = await axiosInstance.post(END_POINT.VOTE_TALK(talkPickId), {
    voteOption: option,
  });
  return response;
};

export const deleteTalkPickVote = async (talkPickId: Id) => {
  const response = await axiosInstance.delete(END_POINT.VOTE_TALK(talkPickId));
  return response;
};

export const postGameVote = async (gameId: Id, option: VoteOption) => {
  const response = await axiosInstance.post(END_POINT.VOTE_GAME(gameId), {
    voteOption: option,
  });
  return response;
};

export const putGameVote = async (gameId: Id, option: VoteOption) => {
  const response = await axiosInstance.put(END_POINT.VOTE_GAME(gameId), {
    voteOption: option,
  });
  return response;
};

export const deleteGameVote = async (gameId: Id) => {
  const response = await axiosInstance.delete(END_POINT.VOTE_GAME(gameId));
  return response;
};
