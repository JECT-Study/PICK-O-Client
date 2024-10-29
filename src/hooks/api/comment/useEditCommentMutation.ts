import { putComment } from '@/api/comments';
import { Id } from '@/types/api';
import { CommentProps } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  selectedPage: number,
  setEditButtonClicked: (value: boolean) => void,
  parentId?: number,
) => {
  const queryClient = useQueryClient();
  const editCommentMutation = useMutation({
    mutationFn: (comment: CommentProps) =>
      putComment(talkPickId, commentId, { ...comment }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'comments', selectedPage - 1],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'bestComments', selectedPage - 1],
        }),
      ]);

      if (parentId) {
        await queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, parentId, 'replies'],
        });
      }
      setEditButtonClicked(false);
    },
  });
  return editCommentMutation;
};
