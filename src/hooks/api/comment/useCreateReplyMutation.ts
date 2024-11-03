import { postReply } from '@/api/comments';
import { Id } from '@/types/api';
import { CommentProps } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateReplyMutation = (
  talkPickId: Id,
  commentId: Id,
  selectedPage: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reply: CommentProps) =>
      postReply(talkPickId, commentId, { ...reply }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'comments', selectedPage - 1],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'bestComments', selectedPage - 1],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, commentId, 'replies'],
        }),
      ]),
  });
};
