import React, { SetStateAction, useState } from 'react';
import { css } from '@emotion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentsPagination, Replies } from '@/types/comment';
import { fetchAddLikeComment, fetchDeleteLikeComment } from '@/api/comments';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { pulsate } from '../../styles/keyframes';
import { Hearts } from '../../assets';

type CommentLikeButtonProps = {
  handleModal: React.Dispatch<SetStateAction<boolean>>;
  myLike: boolean;
  postId: number;
  commentId: number;
  selectedPageNumber: number;
  parentCommentId: number;
};

const CommentLikeButton = ({
  handleModal,
  myLike,
  postId,
  commentId,
  parentCommentId,
  selectedPageNumber,
}: CommentLikeButtonProps) => {
  const queryClient = useQueryClient();
  const { member } = useMemberQuery(
    useParseJwt(useNewSelector(selectAccessToken)).memberId,
  );

  const [isAnimation, setIsAnimation] = useState(false);

  const animationTrigger = () => {
    setIsAnimation(true);
    setTimeout(() => setIsAnimation(false), 500);
  };

  const addLike = useMutation({
    mutationFn: ({
      _postId,
      _commentId,
    }: {
      _postId: number;
      _commentId: number;
    }) => fetchAddLikeComment(_postId, _commentId),
    onMutate: () => {
      if (parentCommentId) {
        const prevReplies: Replies | undefined = queryClient.getQueryData([
          'posts',
          'comments',
          postId,
          parentCommentId,
          'replies',
        ]);

        const newReplies = prevReplies?.map((comment: Comment) => {
          return comment.id === commentId
            ? { ...comment, myLike: true, likesCount: comment.likesCount + 1 }
            : comment;
        });

        queryClient.setQueryData(
          ['posts', 'comments', postId, parentCommentId, 'replies'],
          newReplies,
        );
        return { prevReplies };
      }
      const prevCommentsPagination: CommentsPagination | undefined =
        queryClient.getQueryData([
          'posts',
          'comments',
          postId,
          selectedPageNumber,
        ]);

      const newComments = prevCommentsPagination?.content.map(
        (comment: Comment) => {
          return comment.id === commentId
            ? { ...comment, myLike: true, likesCount: comment.likesCount + 1 }
            : comment;
        },
      );

      queryClient.setQueryData(
        ['posts', 'comments', postId, selectedPageNumber],
        {
          ...prevCommentsPagination,
          content: newComments,
        },
      );
      return { prevCommentsPagination };
    },
    onError: (error, id, context) => {
      if (parentCommentId) {
        queryClient.setQueryData(
          ['posts', 'comments', postId, parentCommentId, 'replies'],
          context?.prevReplies,
        );
      } else {
        queryClient.setQueryData(
          ['posts', 'commnets', postId, selectedPageNumber],
          context?.prevCommentsPagination,
        );
      }
    },
  });

  const deleteLike = useMutation({
    mutationFn: ({
      _postId,
      _commentId,
    }: {
      _postId: number;
      _commentId: number;
    }) => fetchDeleteLikeComment(_postId, _commentId),
    onMutate: () => {
      if (parentCommentId) {
        const prevReplies: Replies | undefined = queryClient.getQueryData([
          'posts',
          'comments',
          postId,
          parentCommentId,
          'replies',
        ]);

        const newReplies = prevReplies?.map((comment: Comment) => {
          return comment.id === commentId
            ? { ...comment, myLike: false, likesCount: comment.likesCount - 1 }
            : comment;
        });

        queryClient.setQueryData(
          ['posts', 'comments', postId, parentCommentId, 'replies'],
          newReplies,
        );
        return { prevReplies };
      }
      const prevCommentsPagination: CommentsPagination | undefined =
        queryClient.getQueryData([
          'posts',
          'comments',
          postId,
          selectedPageNumber,
        ]);
      const newComments = prevCommentsPagination?.content.map(
        (comment: Comment) => {
          return comment.id === commentId
            ? { ...comment, myLike: false, likesCount: comment.likesCount - 1 }
            : comment;
        },
      );

      queryClient.setQueryData(
        ['posts', 'comments', postId, selectedPageNumber],
        {
          ...prevCommentsPagination,
          content: newComments,
        },
      );

      return { prevCommentsPagination };
    },
    onError: (error, id, context) => {
      if (parentCommentId) {
        queryClient.setQueryData(
          ['posts', 'comments', postId, parentCommentId, 'replies'],
          context?.prevReplies,
        );
      } else {
        queryClient.setQueryData(
          ['posts', 'commnets', postId, selectedPageNumber],
          context?.prevCommentsPagination,
        );
      }
    },
  });

  const handleCommentLike = () => {
    if (!member) {
      handleModal(true);
      return;
    }
    animationTrigger();
    if (postId !== undefined) {
      if (myLike) {
        deleteLike.mutate({ _postId: postId, _commentId: commentId });
      } else {
        addLike.mutate({ _postId: postId, _commentId: commentId });
      }
    }
  };

  return (
    <div
      css={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '19px',
        width: '38px',
        height: '38px',
        cursor: 'pointer',
        ':hover': { backgroundColor: 'pink' },
        transition: 'background-color 0.2s',
      })}
      onClick={handleCommentLike}
      role="presentation"
    >
      <Hearts
        css={css({
          fill: `${myLike ? 'red' : 'none'}`,
          animation: `${isAnimation ? `${pulsate} .5s ease-in-out` : 'none'}`,
        })}
      />
    </div>
  );
};

export default CommentLikeButton;
