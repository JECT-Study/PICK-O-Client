import { useState } from 'react';

const useToastModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalText, setModalText] = useState<string | null>(null);

  const showToastModal = (message: string, callback?: () => void) => {
    setModalText(message);
    setIsVisible(true);

    const modalTimer = setTimeout(() => {
      setIsVisible(false);
      callback?.();
    }, 2000);

    return () => clearTimeout(modalTimer);
  };

  return {
    isVisible,
    modalText,
    showToastModal,
  };
};

export default useToastModal;
