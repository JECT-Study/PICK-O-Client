import { useState, useEffect, useRef } from 'react';

const useToastModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalText, setModalText] = useState<string | null>(null);
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToastModal = (message: string, callback?: () => void) => {
    setModalText(message);
    setIsVisible(true);

    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }

    modalTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      callback?.();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (modalTimerRef.current) {
        clearTimeout(modalTimerRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    modalText,
    showToastModal,
  };
};
export default useToastModal;
