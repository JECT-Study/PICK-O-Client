/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { isEmptyString } from '@/utils/validator';
import PostTitleBox from '@/components/atoms/PostTitleBox/PostTitleBox';
import OptionInputBox from '@/components/atoms/OptionInputBox/OptionInputBox';
import Divider from '@/components/atoms/Divider/Divider';
import ImageUploader from '@/components/molecules/ImageUploader/ImageUploader';
import CitationBox from '@/components/atoms/CitationBox/CitationBox';
import DraftPostButton from '@/components/atoms/DraftPostButton/DraftPostButton';
import Button from '@/components/atoms/Button/Button';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import usePostTalkPickForm from '@/hooks/post/usePostTalkPickForm';
import { NewTalkPick, TalkPickDetail } from '@/types/talk-pick';
import { useTempTalkPickQuery } from '@/hooks/api/talk-pick/useTempTalkPickQuery';
import { validatePostForm } from '@/utils/validatePostForm';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './PostInputForm.style';

interface PostInputFormProps {
  onSubmit: (data: NewTalkPick) => void;
  onEditSubmit: (data: NewTalkPick) => void;
  onSave: (data: NewTalkPick) => void;
  existingTalkPick?: TalkPickDetail;
}

const PostInputForm = ({
  onSubmit,
  onEditSubmit,
  onSave,
  existingTalkPick,
}: PostInputFormProps) => {
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

  const { form, onChange, setEach } = usePostTalkPickForm(initialState);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [imgUrls, setImgUrls] = useState<string[]>(
    existingTalkPick?.imgUrls ?? [],
  );

  const { data: tempTalkPick, isSuccess } = useTempTalkPickQuery();

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
    onSave(form);
  };

  const handleTalkPick = () => {
    const postValidation = validatePostForm(form.baseFields);

    if (!postValidation.isValid) {
      showToastModal(postValidation.message);
      return;
    }

    if (existingTalkPick) {
      onEditSubmit(form);
    } else {
      onSubmit(form);
    }
  };

  return (
    <form css={S.formStyling}>
      {isVisible && !isEmptyString(modalText ?? '') && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="black">{modalText}</ToastModal>
        </div>
      )}
      <PostTitleBox
        name="title"
        value={form.baseFields.title}
        onChange={onChange}
        autoComplete="off"
      />
      <div css={S.bodyStyle}>
        <div css={S.optionStyle}>
          <OptionInputBox
            name="optionA"
            option="A"
            value={form.baseFields.optionA}
            onChange={onChange}
            autoComplete="off"
          />
          <OptionInputBox
            name="optionB"
            option="B"
            value={form.baseFields.optionB}
            onChange={onChange}
            autoComplete="off"
          />
        </div>
        <Divider length={1080} orientation="width" />
        <textarea
          name="content"
          css={S.inputStyle}
          placeholder="다른 토커들에게 내 이야기를 공유하고 의견을 들어보세요!"
          value={form.baseFields.content}
          maxLength={2000}
          onChange={onChange}
        />
        <ImageUploader
          imgUrls={imgUrls}
          setImgUrls={setImgUrls}
          fileIds={form.fileIds}
          setFileIds={setEach}
        />
      </div>
      <div css={S.otherStyle}>
        <CitationBox
          name="sourceUrl"
          value={form.baseFields.sourceUrl}
          onChange={onChange}
          autoComplete="off"
        />
        <DraftPostButton onClick={handleDraftButton} />
      </div>
      <div css={S.buttonStyle}>
        <Button
          size="large"
          variant="outlinePrimarySquare"
          onClick={handleTempTalkPick}
        >
          임시저장하기
        </Button>
        <Button size="large" variant="primarySquare" onClick={handleTalkPick}>
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default PostInputForm;
