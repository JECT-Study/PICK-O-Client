import { PaginationType } from '@/types/pagination';

interface GameItem {
  gameSetId: number;
  optionAImg: string;
  optionBImg: string;
  title: string;
  mainTag: string;
  subTag: string;
}

interface SearchTalkPickItem {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  firstImgUrl: string;
  keyword: string;
}

export interface TalkPickResult extends PaginationType {
  content: SearchTalkPickItem[];
  query: string;
}

export interface GameResult extends PaginationType {
  content: GameItem[];
  query: string;
}
