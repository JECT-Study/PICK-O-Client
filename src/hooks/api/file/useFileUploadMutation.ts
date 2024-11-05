/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFile } from '@/api/file';
import { UploadedImage, FileUploadType } from '@/types/file';

export const useFileUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { formData: FormData; params: FileUploadType }) =>
      postFile(data.formData, data.params),
    onSuccess: async (response: UploadedImage) => {
      await queryClient.invalidateQueries({
        queryKey: ['uploadedFiles'],
      });
    },
  });
};
