/* eslint-disable @next/next/no-img-element */
import React from "react";
import { theme_config } from "@themes/config";
import BannerT1 from "@components/section/banner-t1";
import BannerT4 from "@components/section/banner-t4";
import { useUI } from "../../contexts/ui-context";

const LandingPageBanner = () => {
  const { template } = useUI();
  const handleConfig = theme_config(template);
  return (
    <>
      {handleConfig?.theme !== 4 && <BannerT1 />}
      {handleConfig?.theme === 4 && <BannerT4 />}
    </>
  );
};

export default LandingPageBanner;
