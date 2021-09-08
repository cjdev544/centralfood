import { useEffect, useState } from "react";

export const useMediaQueryJs = () => {
  const [isAMobil, setIsAMobil] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let mediaQueryList = window.matchMedia("(max-width: 750px)");
      setIsAMobil(mediaQueryList.matches);

      const listener = () => {
        setIsAMobil(mediaQueryList.matches);
      };

      mediaQueryList.addEventListener("change", listener);

      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    }
  }, []);

  return {
    isAMobil,
  };
};
