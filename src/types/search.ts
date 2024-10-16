import { PaginationType } from '@/types/pagination';
import { GameItem } from '@/components/molecules/SearchGameList/SearchGameList';
import { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';

export interface TalkPickResult extends PaginationType {
  content: SearchTalkPickItemProps[];
  query: string;
}

export interface GameResult extends PaginationType {
  content: GameItem[];
  query: string;
}
