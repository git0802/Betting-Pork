/* eslint-disable @next/next/no-img-element */
import React from "react";
import dynamic from "next/dynamic";
import { theme_config } from "@themes/config";
import SectionFeaturedSlot from "@components/section/featured-slot";
import SectionFeaturedKS from "@components/section/featured-ks";
import SliderSlot from "@components/games/slot/Slider";
import { useDevice } from "@contexts/device-context";
import { useUI } from "../../contexts/ui-context";
import SliderWithBanner from "@components/games/slot/Slider_with_banner";

const SliderRecentPlayed = dynamic(
  () => import("@components/games/recent-played/Slider"),
  {
    ssr: false,
  }
);


const FeaturedSlot = () => {
  const device = useDevice();
  const { template, isAuthorized } = useUI();
  const handleConfig = theme_config(template);

  return (
    <>
      {handleConfig?.theme === 1 && <SectionFeaturedSlot />}
      {handleConfig?.theme === 4 &&
        <>
          <SectionFeaturedKS />
          {isAuthorized &&
            <div className="container mx-auto">
              <SliderRecentPlayed
                margin={device.isMobileDevice ? true : false}
              />
            </div>
          }
          <div className="container mx-auto w-full">
            <SliderSlot />
          </div>
          {/* <SliderWithBanner /> */}
        </>
      }
    </>
  );
};

export default FeaturedSlot;