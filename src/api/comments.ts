import { END_POINT } from '@/constants/api';
import { Id, ServerResponse } from '@/types/api';
import { Comment, CommentsPagination, CommentProps } from '@/types/comment';
import { Pageable } from '@/types/pagination';
import { axiosInstance } from './interceptor';

export const putComment = async (
  talkPickId: Id,
  commentId: Id,
  comment: CommentProps,
) => {
  const { data } = await axiosInstance.put<ServerResponse>(
    END_POINT.EDIT_COMMENT(talkPickId, commentId),
    {
      ...comment,
    },
  );
  return data;
};

export const deleteComment = async (talkPickId: Id, commentId: Id) => {
  const { data } = await axiosInstance.delete<ServerResponse>(
    END_POINT.DELETE_COMMENT(talkPickId, commentId),
  );
  return data;
};

export const getComments = async (talkPickId: Id, pageable: Pageable) => {
  const { data } = await axiosInstance.get<CommentsPagination>(
    END_POINT.COMMENTS(talkPickId),
    {
      params: { ...pageable, sort: 'createdAt,desc' },
    },
  );
  return data;
};

export const postComment = async (talkPickId: Id, comment: CommentProps) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    END_POINT.CREATE_COMMENT(talkPickId),
    {
      ...comment,
    },
  );
  return data;
};

export const postReply = async (
  talkPickId: Id,
  commentId: Id,
  reply: CommentProps,
) => {
  const { data } = await axiosInstance.post<ServerResponse>(
    END_POINT.CREATE_REPLY(talkPickId, commentId),
    {
      ...reply,
    },
  );
  return data;
};

export const getReplies = async (talkPickId: Id, commentId: Id) => {
  const { data } = await axiosInstance.get<Comment[]>(
    END_POINT.REPLIES(talkPickId, commentId),
  );
  return data;
};

export const getBestComments = async (talkPickId: Id, pageable: Pageable) => {
  const { data } = await axiosInstance.get<CommentsPagination>(
    END_POINT.BEST_COMMENT(talkPickId),
    {
      params: { ...pageable, sort: 'createdAt,desc' },
    },
  );
  return data;
};
