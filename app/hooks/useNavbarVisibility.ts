import { useEffect, useState } from 'react';

const useNavbarVisibility = (): { isVisible: boolean } => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    let handleScroll: () => void;

    if (typeof window !== undefined) {
      let prevScroll = window.pageYOffset;

      handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > prevScroll) {
          setIsScrollDown(true);
        } else {
          setIsScrollDown(false);
        }

        prevScroll = currentScroll;
      };

      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isVisible: isScrollDown };
};

export default useNavbarVisibility;
