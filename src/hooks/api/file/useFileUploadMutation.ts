import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFile } from '@/api/file';
import { UploadedImage, FileUploadType } from '@/types/file';

export const useFileUploadMutation = (
  setIsUploadingImage?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { formData: FormData; params: FileUploadType }) =>
      postFile(data.formData, data.params),
    onMutate: () => {
      if (setIsUploadingImage) {
        setIsUploadingImage(true);
      }
    },
    onSuccess: async (response: UploadedImage) => {
      await queryClient.invalidateQueries({
        queryKey: ['uploadedFiles'],
      });
    },
    onSettled: () => {
      if (setIsUploadingImage) {
        setIsUploadingImage(false);
      }
    },
  });
};
