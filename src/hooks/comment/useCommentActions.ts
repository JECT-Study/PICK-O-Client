import { Comment } from '@/types/comment';
import { useCreateLikeCommentMutation } from '@/hooks/api/like/useCreateLikeCommentMutation';
import { useDeleteLikeCommentMutation } from '@/hooks/api/like/useDeleteLikeCommentMutation';
import { useEditCommentMutation } from '@/hooks/api/comment/useEditCommentMutation';
import { useDeleteCommentMutation } from '@/hooks/api/comment/useDeleteCommentMutation';
import { useReportCommentMutation } from '@/hooks/api/report/useReportCommentMutation';

export const useCommentActions = (
  commentData: Comment,
  editText: string,
  selectedPage: number,
  setEditButtonClicked: (value: boolean) => void,
  showToastModal: (message: string, callback?: () => void) => void,
  parentId?: number,
) => {
  const { id, talkPickId, content, myLike } = commentData;

  const { mutate: editComment } = useEditCommentMutation(
    talkPickId,
    id,
    selectedPage,
    setEditButtonClicked,
    parentId,
  );

  const { mutate: deleteComment } = useDeleteCommentMutation(
    talkPickId,
    id,
    selectedPage,
    parentId,
  );

  const { mutate: createLikeComment } = useCreateLikeCommentMutation(
    talkPickId,
    id,
    selectedPage,
    showToastModal,
    parentId,
  );

  const { mutate: deleteLikeComment } = useDeleteLikeCommentMutation(
    talkPickId,
    id,
    selectedPage,
    parentId,
  );

  const { mutate: handleReport } = useReportCommentMutation(
    talkPickId,
    id,
    selectedPage,
    showToastModal,
    parentId,
  );

  const handleEditSubmit = () => {
    if (content === editText) return;
    editComment({ content: editText });
  };

  const handleDelete = () => {
    deleteComment();
  };

  const handleLikeToggle = () =>
    myLike ? deleteLikeComment() : createLikeComment();

  return {
    handleEditSubmit,
    handleDelete,
    handleLikeToggle,
    handleReport,
  };
};
