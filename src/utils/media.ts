import { useMediaQuery } from 'react-responsive';

export const MediaMobile = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  return isMobile
}

export const MediaTab = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  return isMobile
}