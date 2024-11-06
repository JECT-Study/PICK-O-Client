import { useState, ChangeEvent, useCallback } from 'react';
import { NewTalkPick } from '@/types/talk-pick';

function useTalkPickInputs(initialState: NewTalkPick) {
  const [form, setForm] = useState<NewTalkPick>(initialState);

  const onChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;

      if (name in form.baseFields) {
        setForm((prevForm) => ({
          ...prevForm,
          baseFields: {
            ...prevForm.baseFields,
            [name]: value,
          },
        }));
      } else {
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    },
    [form],
  );

  const setEach = useCallback(
    <U>(name: string, value: U) => {
      if (name in form.baseFields) {
        setForm((prevForm) => ({
          ...prevForm,
          baseFields: {
            ...prevForm.baseFields,
            [name]: value,
          },
        }));
      } else {
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    },
    [form],
  );

  return { form, onChange, setEach };
}

export default useTalkPickInputs;
