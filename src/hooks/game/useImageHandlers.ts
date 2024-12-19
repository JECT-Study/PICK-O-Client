import { BalanceGameSet } from '@/types/game';
import { resizeImage } from '@/utils/imageUtils';
import { FileUploadType } from '@/types/file';

interface UseImageHandlersProps {
  uploadImage: (variables: {
    formData: FormData;
    params: FileUploadType;
  }) => Promise<{
    imgUrls: string[];
    fileIds: number[];
  }>;
}

export const useImageHandlers = ({ uploadImage }: UseImageHandlersProps) => {
  const handleImageUpload = async (
    imageFile: File,
    type: FileUploadType,
  ): Promise<{ imgUrl: string; fileId: number }> => {
    const resizedBlob = await resizeImage(imageFile, 577, 359);
    const resizedFile = new File([resizedBlob], imageFile.name, {
      type: imageFile.type,
    });

    const formData = new FormData();
    formData.append('file', resizedFile);

    const response = await uploadImage({ formData, params: type });
    return { imgUrl: response.imgUrls[0], fileId: response.fileIds[0] };
  };

  const onImageChange = async (
    stageIndex: number,
    optionIndex: number,
    imageFile: File,
    updateGames: (
      updater: (games: BalanceGameSet[]) => BalanceGameSet[],
    ) => void,
  ): Promise<boolean> => {
    try {
      const { imgUrl, fileId } = await handleImageUpload(imageFile, {
        type: 'GAME_OPTION',
      });
      updateGames((prevGames) => {
        const updatedGames = [...prevGames];
        updatedGames[stageIndex].gameOptions[optionIndex] = {
          ...updatedGames[stageIndex].gameOptions[optionIndex],
          imgUrl,
          fileId,
        };
        return updatedGames;
      });
      return true;
    } catch {
      return false;
    }
  };

  const deleteImage = (
    stageIndex: number,
    optionIndex: number,
    updateGames: (
      updater: (games: BalanceGameSet[]) => BalanceGameSet[],
    ) => void,
  ) => {
    updateGames((prevGames) => {
      const updatedGames = [...prevGames];
      updatedGames[stageIndex].gameOptions[optionIndex] = {
        ...updatedGames[stageIndex].gameOptions[optionIndex],
        imgUrl: '',
        fileId: null,
      };
      return updatedGames;
    });
  };

  return {
    onImageChange,
    deleteImage,
  };
};
