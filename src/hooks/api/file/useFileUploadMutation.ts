/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFile } from '@/api/file';
import { FileUploadType } from '@/types/file';

export const useFileUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { formData: FormData; params: FileUploadType }) =>
      postFile(data.formData, data.params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['uploadedFiles'],
      });
    },
  });
};
