// import { DEFAULT_PROFILE_URL } from '@/constants/image';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export interface InputProfileImageProps {
  setImageFileId: (name: string, profileImgId: number | null) => void;
  imgSrc?: string;
  setIsImgChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCheckProfileImage = ({
  setImageFileId,
  imgSrc,
  setIsImgChanged,
}: InputProfileImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(imgSrc || '');
  const [isError, setIsError] = useState<boolean>(false);
  const { mutate: fileUpload } = useFileUploadMutation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onloadend = (e) => {
          setImageSrc(e.target?.result as string);
        };
        setIsError(false);
        const frm = new FormData();
        frm.append('file', acceptedFiles[0], acceptedFiles[0].name);
        fileUpload(
          { formData: frm, params: { type: 'MEMBER' } },
          {
            onSuccess: (res) => {
              setImageSrc(res.imgUrls[0]);
              setImageFileId('profileImgId', res.fileIds[0]);
              setIsImgChanged?.(true);
            },
          },
        );
      } else {
        setIsError(true);
        setImageFileId('profileImgUrl', null);
      }
    },
    [fileUpload, setImageFileId, setIsImgChanged],
  );

  const { getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxSize: 3145728, // 3MB
  });

  const handleDefaultImage = useCallback(
    (src: string) => {
      // const defaultProfileUrlMapping: { [key: string]: string } = {
      //   [DEFAULT_PROFILE_URL.OCTOPUS.CLIENT]:
      //     DEFAULT_PROFILE_URL.OCTOPUS.SERVER,
      //   [DEFAULT_PROFILE_URL.JELLYFISH.CLIENT]:
      //     DEFAULT_PROFILE_URL.JELLYFISH.SERVER,
      //   [DEFAULT_PROFILE_URL.RAY.CLIENT]: DEFAULT_PROFILE_URL.RAY.SERVER,
      //   [DEFAULT_PROFILE_URL.EEL.CLIENT]: DEFAULT_PROFILE_URL.EEL.SERVER,
      //   [DEFAULT_PROFILE_URL.TURTLE.CLIENT]: DEFAULT_PROFILE_URL.TURTLE.SERVER,
      //   [DEFAULT_PROFILE_URL.RABBIT.CLIENT]: DEFAULT_PROFILE_URL.RABBIT.SERVER,
      // };

      // const profileImgUrl = defaultProfileUrlMapping[src] || '';

      setImageSrc(src);
      // setImageFileId('profileImgUrl', profileImgUrl);
    },
    [setImageSrc],
  );

  return { imageSrc, isError, getRootProps, handleDefaultImage };
};
