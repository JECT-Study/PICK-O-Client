import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFriendsListQuery } from '@/hooks/api/friends/useFriendsListQuery';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';

export interface ProfileImageProps {
  setImageFileId: (name: string, profileImgId: number | null) => void;
  imgSrc?: string;
  setIsImageChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCheckProfileImage = ({
  setImageFileId,
  imgSrc,
  setIsImageChanged,
}: ProfileImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(imgSrc || '');
  const [isError, setIsError] = useState<boolean>(false);

  const { mutate: fileUpload } = useFileUploadMutation();
  const { friendsList } = useFriendsListQuery();
  const friendsImageList = friendsList?.map((friend) => friend.imgUrl);

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
              setIsImageChanged?.(true);
            },
          },
        );
      } else {
        setIsError(true);
        setImageFileId('profileImgId', null);
      }
    },
    [fileUpload, setImageFileId, setIsImageChanged],
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
      const selectedFriend = friendsList?.find(
        (friend) => friend.imgUrl === src,
      );

      setImageSrc(src);
      setImageFileId('profileImgId', selectedFriend?.fileId ?? null);
      setIsImageChanged?.(true);
    },
    [friendsList, setImageFileId, setIsImageChanged],
  );

  return {
    imageSrc,
    isError,
    getRootProps,
    friendsImageList,
    handleDefaultImage,
  };
};
