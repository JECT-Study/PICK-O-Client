import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.matchMedia('(max-width: 480px)').matches;
      setIsMobile(
        mobile || ('ontouchstart' in window && window.innerWidth <= 768),
      );
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}
export default useIsMobile;
