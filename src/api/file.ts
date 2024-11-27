import { END_POINT } from '@/constants/api';
import { UploadedImage, FileUploadType } from '@/types/file';
import { ServerResponse } from '@/types/api';
import { axiosInstance } from './interceptor';

export const postFile = async (file: FormData, params: FileUploadType) => {
  const response = await axiosInstance.post(`${END_POINT.FILE_UPLOAD}`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      type: params.type,
    },
  });
  return response.data as UploadedImage;
};

export const deleteFile = async (fileId: number) => {
  const { data } = await axiosInstance.delete<ServerResponse>(
    END_POINT.FILE_DELETE(fileId),
  );
  return data;
};
