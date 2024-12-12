import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.matchMedia('(max-width: 430px)').matches;
      setIsMobile(
        mobile || ('ontouchstart' in window && window.innerWidth <= 430),
      );
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}
export default useIsMobile;
