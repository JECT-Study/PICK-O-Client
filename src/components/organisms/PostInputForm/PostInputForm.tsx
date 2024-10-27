/* eslint-disable consistent-return */
import React, { useState, useEffect, ForwardedRef, forwardRef } from 'react';
import { isEmptyString } from '@/utils/validator';
import { validatePostForm } from '@/utils/validatePostForm';
import PostTitleBox from '@/components/atoms/PostTitleBox/PostTitleBox';
import OptionInputBox from '@/components/atoms/OptionInputBox/OptionInputBox';
import Divider from '@/components/atoms/Divider/Divider';
import ImageUploader from '@/components/molecules/ImageUploader/ImageUploader';
import CitationBox from '@/components/atoms/CitationBox/CitationBox';
import DraftPostButton from '@/components/atoms/DraftPostButton/DraftPostButton';
import Button from '@/components/atoms/Button/Button';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import { useTempTalkPickQuery } from '@/hooks/api/talk-pick/useTempTalkPickQuery';
import { NewTalkPick, TalkPickDetail } from '@/types/talk-pick';
import * as S from './PostInputForm.style';

interface PostInputFormProps {
  onSubmit: (data: NewTalkPick) => void;
  onEditSubmit: (data: NewTalkPick) => void;
  onSave: (data: NewTalkPick) => void;
  existingTalkPick?: TalkPickDetail;
}

const PostInputForm = (
  { onSubmit, onEditSubmit, onSave, existingTalkPick }: PostInputFormProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  const [title, setTitle] = useState<string>(existingTalkPick?.title ?? '');
  const [optionA, setOptionA] = useState<string>(
    existingTalkPick?.optionA ?? '',
  );
  const [optionB, setOptionB] = useState<string>(
    existingTalkPick?.optionB ?? '',
  );
  const [content, setContent] = useState<string>(
    existingTalkPick?.content ?? '',
  );

  const [sourceUrl, setSourceUrl] = useState<string>(
    existingTalkPick?.sourceUrl ?? '',
  );
  const [imgUrls, setImgUrls] = useState<string[]>(
    existingTalkPick?.imgUrls ?? [],
  );
  const [storedNames, setStoredNames] = useState<string[]>(
    existingTalkPick?.imgStoredNames ?? [],
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasPostError, setHasPostError] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [buttonType, setButtonType] = useState<
    'TALK_PICK' | 'TEMP_TALK_PICK' | null
  >(null);

  const { mutate: uploadFiles } = useFileUploadMutation();

  useEffect(() => {
    if (hasPostError) {
      const timer = setTimeout(() => {
        setHasPostError(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hasPostError]);

  useEffect(() => {
    if (isSubmitting && !hasPostError) {
      const postData = {
        title,
        optionA,
        optionB,
        content,
        sourceUrl,
        storedNames,
      };

      if (buttonType === 'TEMP_TALK_PICK') {
        onSave(postData);
      } else if (buttonType === 'TALK_PICK') {
        if (existingTalkPick) {
          onEditSubmit(postData);
        } else {
          onSubmit(postData);
        }
      }

      setButtonType(null);
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    hasPostError,
    storedNames,
    title,
    optionA,
    optionB,
    content,
    sourceUrl,
    buttonType,
    onSubmit,
    onEditSubmit,
    onSave,
    existingTalkPick,
  ]);

  const handleFormSubmit = (type: 'TALK_PICK' | 'TEMP_TALK_PICK') => {
    setButtonType(type);

    if (imageFiles.length > 0) {
      const imageFormData = new FormData();
      imageFiles.forEach((file) => imageFormData.append('file', file));

      uploadFiles(
        { formData: imageFormData, params: { type } },
        {
          onSuccess: (response) => {
            setStoredNames(response.storedNames);
            setIsSubmitting(true);
          },
        },
      );
    } else {
      setIsSubmitting(true);
    }
  };

  const setPostFormError = (message: string) => {
    setHasPostError(true);
    setToastMessage(message);
  };

  const handlePostButton = () => {
    const postValidation = validatePostForm(title, optionA, optionB, content);

    if (!postValidation.isValid) {
      setPostFormError(postValidation.message);
      return;
    }

    if (!hasPostError) handleFormSubmit('TALK_PICK');
  };

  const { data: tempTalkPick, isSuccess } = useTempTalkPickQuery();

  const handleLoadDraft = () => {
    if (isSuccess && tempTalkPick) {
      setTitle(tempTalkPick.title);
      setOptionA(tempTalkPick.optionA);
      setOptionB(tempTalkPick.optionB);
      setContent(tempTalkPick.content);
      setSourceUrl(tempTalkPick.sourceUrl as string);
      setImgUrls(tempTalkPick.imgUrls);
      setStoredNames(tempTalkPick.storedNames);
    }
  };

  return (
    <div css={S.formStyling}>
      {hasPostError && !isEmptyString(toastMessage) && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="black">{toastMessage}</ToastModal>
        </div>
      )}
      <PostTitleBox
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <div css={S.bodyStyle}>
        <div css={S.optionStyle}>
          <OptionInputBox
            option="A"
            value={optionA}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOptionA(e.target.value)
            }
          />
          <OptionInputBox
            option="B"
            value={optionB}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOptionB(e.target.value)
            }
          />
        </div>
        <Divider length={1080} orientation="width" />
        <textarea
          css={S.inputStyle}
          placeholder="다른 토커들에게 내 이야기를 공유하고 의견을 들어보세요!"
          ref={ref}
          value={content}
          maxLength={2000}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <ImageUploader
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          imgUrls={imgUrls}
          setImgUrls={setImgUrls}
          storedNames={storedNames}
        />
      </div>
      <div css={S.otherStyle}>
        <CitationBox value={sourceUrl} setSourceUrl={setSourceUrl} />
        <DraftPostButton onClick={handleLoadDraft} />
      </div>
      <div css={S.buttonStyle}>
        <Button
          size="large"
          variant="outlinePrimarySquare"
          onClick={() => handleFormSubmit('TEMP_TALK_PICK')}
        >
          임시저장하기
        </Button>
        <Button size="large" variant="primarySquare" onClick={handlePostButton}>
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default forwardRef(PostInputForm);
