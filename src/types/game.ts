import { PaginationType } from './pagination';

export interface GameOption {
  id: number;
  name: string;
  imgUrl: string | null;
  description: string;
  optionType: 'A' | 'B';
}

export interface GameDetail {
  id: number;
  description?: string;
  gameOptions: GameOption[];
  votesCountOfOptionA: number;
  votesCountOfOptionB: number;
  myBookmark: boolean;
  votedOption: 'A' | 'B' | null;
}

export interface GameSet {
  member: string;
  title: string;
  createdAt: string;
  mainTag: string;
  subTag: string;
  gameDetailResponses: GameDetail[];
  isEndGameSet: boolean;
  isEndBookmarked: boolean;
}

export interface Game {
  title: string;
  mainTag: string;
  subTag: string;
  images: string[];
  bookmarkState?: boolean;
}

export interface GameContent extends Game {
  id: number;
}

export interface GameItem extends GameContent {
  myBookMark: boolean;
  myVote: boolean;
}

export interface GamesPagination extends PaginationType {
  content: GameContent[];
}
