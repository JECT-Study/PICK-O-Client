import { useState } from 'react';
import { NewTalkPick, TalkPickDetail } from '@/types/talk-pick';
import { validatePostForm } from '@/hooks/post/validatePostForm';
import useToastModal from '../modal/useToastModal';
import useTalkPickInputs from './useTalkPickInputs';
import { useCreateTalkPickMutation } from '../api/talk-pick/useCreateTalkPickMutation';
import { useEditTalkPickMutation } from '../api/talk-pick/useEditTalkPickMutation';
import { useSaveTempTalkPickMutation } from '../api/talk-pick/useSaveTempTalkPickMutation';
import { useTempTalkPickQuery } from '../api/talk-pick/useTempTalkPickQuery';

export const usePostTalkPickForm = (existingTalkPick?: TalkPickDetail) => {
  const initialState: NewTalkPick = {
    baseFields: {
      title: existingTalkPick?.baseFields.title ?? '',
      optionA: existingTalkPick?.baseFields.optionA ?? '',
      optionB: existingTalkPick?.baseFields.optionB ?? '',
      content: existingTalkPick?.baseFields.content ?? '',
      sourceUrl: existingTalkPick?.baseFields.sourceUrl ?? '',
    },
    fileIds: existingTalkPick?.fileIds ?? [],
  };

  const { form, onChange, setEach } = useTalkPickInputs(initialState);
  const { isVisible, modalText, showToastModal } = useToastModal();
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const { mutate: createTalkPick } = useCreateTalkPickMutation(showToastModal);
  const { mutate: editTalkPick } = useEditTalkPickMutation(
    existingTalkPick?.id ?? 0,
    showToastModal,
  );
  const { mutate: saveTempTalkPick } =
    useSaveTempTalkPickMutation(showToastModal);
  const { data: tempTalkPick, isSuccess } = useTempTalkPickQuery();

  const [imgUrls, setImgUrls] = useState<string[]>(
    existingTalkPick?.imgUrls ?? [],
  );

  const handleDraftButton = () => {
    if (isSuccess && tempTalkPick) {
      setEach('title', tempTalkPick.baseFields.title);
      setEach('optionA', tempTalkPick.baseFields.optionA);
      setEach('optionB', tempTalkPick.baseFields.optionB);
      setEach('content', tempTalkPick.baseFields.content);
      setEach('sourceUrl', tempTalkPick.baseFields.sourceUrl);
      setEach('fileIds', tempTalkPick.fileIds);
      setImgUrls(tempTalkPick.imgUrls);
    }
  };

  const handleTempTalkPick = () => {
    saveTempTalkPick(form);
  };

  const handleTalkPick = () => {
    const postValidation = validatePostForm(form.baseFields);

    if (!postValidation.isValid) {
      showToastModal(postValidation.message);
      return;
    }

    if (isUploadingImage) {
      showToastModal('이미지를 업로드하고 있어요!');
      return;
    }

    if (existingTalkPick) {
      editTalkPick(form);
    } else {
      createTalkPick(form);
    }
  };

  return {
    form,
    onChange,
    setEach,
    isVisible,
    modalText,
    imgUrls,
    setImgUrls,
    setIsUploadingImage,
    handleDraftButton,
    handleTempTalkPick,
    handleTalkPick,
  };
};
