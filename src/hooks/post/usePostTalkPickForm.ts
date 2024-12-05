import { useState } from 'react';
import { isEqual } from 'lodash';
import {
  NewTalkPick,
  EditTalkPick,
  NewTempTalkPick,
  TalkPickDetail,
} from '@/types/talk-pick';
import { ERROR } from '@/constants/message';
import useToastModal from '@/hooks/modal/useToastModal';
import useTalkPickInputs from '@/hooks/post/useTalkPickInputs';
import { validatePostForm } from '@/hooks/post/validatePostForm';
import { useCreateTalkPickMutation } from '@/hooks/api/talk-pick/useCreateTalkPickMutation';
import { useEditTalkPickMutation } from '@/hooks/api/talk-pick/useEditTalkPickMutation';
import { useSaveTempTalkPickMutation } from '@/hooks/api/talk-pick/useSaveTempTalkPickMutation';
import { useTempTalkPickQuery } from '@/hooks/api/talk-pick/useTempTalkPickQuery';

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

  const isEditing: boolean = !!existingTalkPick;
  const isTalkPickEdited: boolean =
    !isEqual(existingTalkPick?.baseFields, form.baseFields) ||
    !isEqual(existingTalkPick?.fileIds, form.fileIds);

  const { mutate: createTalkPick } = useCreateTalkPickMutation(showToastModal);
  const { mutate: editTalkPick } = useEditTalkPickMutation(
    existingTalkPick?.id ?? 0,
    showToastModal,
  );
  const { mutate: saveTempTalkPick } =
    useSaveTempTalkPickMutation(showToastModal);
  const { data: tempTalkPick, isSuccess } = useTempTalkPickQuery();

  const [newFileIds, setNewFileIds] = useState<number[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);
  const [isTempLoaded, setIsTempLoaded] = useState<boolean>(false);
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
      setIsTempLoaded(true);
    }
  };

  const handleTempTalkPick = () => {
    const tempForm: NewTempTalkPick = {
      baseFields: form.baseFields,
      newFileIds: newFileIds ?? [],
      deleteFileIds: deleteFileIds ?? [],
      isLoaded: isTempLoaded,
    };
    saveTempTalkPick(tempForm);
    setIsTempLoaded(true);
  };

  const handleTalkPick = () => {
    const postValidation = validatePostForm(form.baseFields);

    if (!postValidation.isValid) {
      showToastModal(postValidation.message);
      return;
    }

    if (isUploadingImage) {
      showToastModal(ERROR.CREATE.IMAGE_UPLOAD);
      return;
    }

    if (isEditing) {
      if (!isTalkPickEdited) return;

      const editForm: EditTalkPick = {
        baseFields: form.baseFields,
        newFileIds: newFileIds ?? [],
        deleteFileIds: deleteFileIds ?? [],
      };
      editTalkPick(editForm);
    } else {
      createTalkPick(form);
    }
  };

  return {
    form,
    onChange,
    setEach,
    isEditing,
    isTempLoaded,
    isTalkPickEdited,
    isVisible,
    modalText,
    imgUrls,
    setImgUrls,
    setNewFileIds,
    setDeleteFileIds,
    setIsUploadingImage,
    handleDraftButton,
    handleTempTalkPick,
    handleTalkPick,
  };
};
