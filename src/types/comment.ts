import { PaginationType } from './pagination';

export interface Comment {
  id: number;
  talkPickId: number;
  talkPickTitle: string;
  nickname: string;
  profileImage: string;
  content: string;
  voteOption: 'A' | 'B' | null;
  likesCount: number;
  myLike: boolean;
  replyCount: number;
  reportedCount: number;
  createdAt: string;
  lastModifiedAt: string;
  best: boolean;
  edited: boolean;
}

export interface CommentsPagination extends PaginationType {
  content: Comment[];
}

export type CommentProps = Pick<Comment, 'content'>;

export type CommentsCategory = 'comments' | 'bestComments';
