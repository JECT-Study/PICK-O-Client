import { PaginationType } from '@/types/pagination';

export interface GameListItem {
  gameSetId: number;
  optionAImg: string;
  optionBImg: string;
  title: string;
  mainTag: string;
  subTag: string;
}

export interface SearchTalkPickListItem {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  firstImgUrl: string;
  keyword: string;
}

export interface TalkPickResult extends PaginationType {
  content: SearchTalkPickListItem[];
  query: string;
}

export interface GameResult extends PaginationType {
  content: GameListItem[];
  query: string;
}
