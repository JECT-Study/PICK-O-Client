/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFile } from '@/api/file';
import { UploadedImage, FileUploadType } from '@/types/file';

export const useFileUploadMutation = (
  setIsUploadingImage: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { formData: FormData; params: FileUploadType }) =>
      postFile(data.formData, data.params),
    onMutate: () => {
      setIsUploadingImage(true);
    },
    onSuccess: async (response: UploadedImage) => {
      console.log(response);
      await queryClient.invalidateQueries({
        queryKey: ['uploadedFiles'],
      });
    },
  });
};
