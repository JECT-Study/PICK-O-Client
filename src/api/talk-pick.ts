import { END_POINT } from '@/constants/api';
import { Id } from '@/types/api';
import {
  TalkPickDetail,
  NewTalkPick,
  TempTalkPick,
  TalkPickListItem,
  TalkPickListPagination,
  TodayTalkPick,
} from '@/types/talk-pick';
import { Pageable } from '@/types/pagination';
import { axiosInstance } from './interceptor';

export const getTalkPickDetail = async (talkPickId: Id) => {
  const { data } = await axiosInstance.get<TalkPickDetail>(
    END_POINT.TALKPICK(talkPickId),
  );
  return data;
};

export const putTalkPick = async (
  talkPickId: Id,
  talkPickData: NewTalkPick,
) => {
  const response = await axiosInstance.put(
    END_POINT.TALKPICK(talkPickId),
    talkPickData,
  );
  return response;
};

export const deleteTalkPick = async (talkPickId: Id) => {
  const response = await axiosInstance.delete(END_POINT.TALKPICK(talkPickId));
  return response;
};

export const postTalkPick = async (talkPickData: NewTalkPick) => {
  const { data } = await axiosInstance.post<Id>(
    END_POINT.CREATE_TALKPICK,
    talkPickData,
  );
  return data;
};

export const postTempTalkPick = async (talkPickData: NewTalkPick) => {
  const response = await axiosInstance.post(
    END_POINT.TEMP_TALKPICK,
    talkPickData,
  );
  return response;
};

export const getTempTalkPick = async () => {
  const { data } = await axiosInstance.get<TempTalkPick>(
    END_POINT.TEMP_TALKPICK,
  );
  return data;
};

export const getBestTalkPickList = async () => {
  const { data } = await axiosInstance.get<TalkPickListItem[]>(
    END_POINT.BEST_TALKPICK,
  );
  return data;
};

export const getTodayTalkPick = async () => {
  const { data } = await axiosInstance.get<TodayTalkPick>(
    END_POINT.TODAY_TALKPICK,
  );
  return data;
};

export const getTalkPickList = async (pageable: Pageable) => {
  const { data } = await axiosInstance.get<TalkPickListPagination>(
    END_POINT.TALKPICK_LIST,
    {
      params: pageable,
    },
  );
  return data;
};

export const postTalkPickSummary = async (talkPickId: Id) => {
  const response = await axiosInstance.post(
    END_POINT.TALKPICK_SUMMARY(talkPickId),
  );
  return response;
};
