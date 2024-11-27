import React from 'react';
import { isEmptyString } from '@/utils/validator';
import { PLACE_HOLDER } from '@/constants/message';
import PostTitleBox from '@/components/atoms/PostTitleBox/PostTitleBox';
import OptionInputBox from '@/components/atoms/OptionInputBox/OptionInputBox';
import Divider from '@/components/atoms/Divider/Divider';
import ImageUploader from '@/components/molecules/ImageUploader/ImageUploader';
import CitationBox from '@/components/atoms/CitationBox/CitationBox';
import DraftPostButton from '@/components/atoms/DraftPostButton/DraftPostButton';
import Button from '@/components/atoms/Button/Button';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { TalkPickDetail } from '@/types/talk-pick';
import { usePostTalkPickForm } from '@/hooks/post/usePostTalkPickForm';
import * as S from './PostInputForm.style';

interface PostInputFormProps {
  existingTalkPick?: TalkPickDetail;
}

const PostInputForm = ({ existingTalkPick }: PostInputFormProps) => {
  const {
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
  } = usePostTalkPickForm(existingTalkPick);

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
          placeholder={PLACE_HOLDER.POST.CONTENT}
          value={form.baseFields.content}
          maxLength={2000}
          onChange={onChange}
        />
        <ImageUploader
          imgUrls={imgUrls}
          setImgUrls={setImgUrls}
          fileIds={form.fileIds}
          setFileIds={setEach}
          setIsUploadingImage={setIsUploadingImage}
          isEditing={isEditing}
          isTempLoaded={isTempLoaded}
          setNewFileIds={setNewFileIds}
          setDeleteFileIds={setDeleteFileIds}
        />
      </div>
      <div css={S.otherStyle}>
        <CitationBox
          name="sourceUrl"
          value={form.baseFields.sourceUrl}
          onChange={onChange}
          autoComplete="off"
        />
        {!existingTalkPick && <DraftPostButton onClick={handleDraftButton} />}
      </div>
      <div css={S.buttonStyle}>
        {!isEditing && (
          <Button
            size="large"
            variant="outlinePrimarySquare"
            onClick={handleTempTalkPick}
          >
            임시저장하기
          </Button>
        )}
        <Button
          size="large"
          variant="primarySquare"
          onClick={handleTalkPick}
          css={S.getButtonStyle(isEditing && !isTalkPickEdited)}
        >
          {isEditing ? '수정완료' : '등록하기'}
        </Button>
      </div>
    </form>
  );
};

export default PostInputForm;
