import { useState, ChangeEvent, useCallback } from 'react';
import { NewTalkPick } from '@/types/talk-pick';

function useInputs(initialState: NewTalkPick) {
  const [form, setForm] = useState<NewTalkPick>(initialState);

  // onChange로 baseFields의 특정 필드를 업데이트
  const onChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;

      // name이 baseFields 내의 필드를 가리킬 경우
      if (name in form.baseFields) {
        setForm((prevForm) => ({
          ...prevForm,
          baseFields: {
            ...prevForm.baseFields,
            [name]: value, // baseFields 내에서 해당 name을 찾아 업데이트
          },
        }));
      } else {
        // 그 외 필드가 있으면 일반적인 업데이트 처리
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    },
    [form],
  );

  const setEach = useCallback(
    <U>(name: string, value: U) => {
      // name이 baseFields 내의 필드를 가리킬 경우
      if (name in form.baseFields) {
        setForm((prevForm) => ({
          ...prevForm,
          baseFields: {
            ...prevForm.baseFields,
            [name]: value, // baseFields 내에서 해당 name을 찾아 업데이트
          },
        }));
      } else {
        // 그 외 필드는 일반적으로 업데이트
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    },
    [form],
  );

  return { form, onChange, setEach };
}

export default useInputs;
