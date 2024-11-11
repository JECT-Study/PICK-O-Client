import { PaginationType } from './pagination';

export type TalkPickField = {
  title: string;
  content: string;
  optionA: string;
  optionB: string;
  sourceUrl: string;
};

export type TalkPickDetail = {
  id: number;
  baseFields: TalkPickField;
  summary: TalkPickSummary;
  imgUrls: string[];
  fileIds: number[];
  votesCountOfOptionA: number;
  votesCountOfOptionB: number;
  views: number;
  bookmarks: number;
  myBookmark: boolean;
  votedOption: 'A' | 'B' | null;
  writer: string;
  createdAt: string;
  isEdited: boolean;
};

export type TalkPickSummary = {
  summaryFirstLine: string | null;
  summarySecondLine: string | null;
  summaryThirdLine: string | null;
};

export type TalkPickListItem = {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  views: number | string;
  bookmarks: number | string;
};

export interface TalkPickListPagination extends PaginationType {
  content: TalkPickListItem[];
}

export type NewTalkPick = {
  baseFields: TalkPickField;
  fileIds: number[];
};

export interface TempTalkPick extends NewTalkPick {
  imgUrls: string[];
}

export type TalkPick = {
  title: string;
  content: string;
  summary: TalkPickSummary;
  optionA: string;
  optionB: string;
};

export type TodayTalkPick = {
  id: number;
  title: string;
  optionA: string;
  optionB: string;
};
