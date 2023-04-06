import React, { useEffect, useState } from "react";
import {
  CarouselSwiperWithBanner,
  CarouselSwiperMultipleRowsWithBanner
} from "@components/carousel/swiper";
import { useGamesQuery } from "@framework/game/get-all-games";
import { useDevice } from "@contexts/device-context";
import { theme_config } from "@themes/config";
import { useUI } from "../../../contexts/ui-context";

const SliderWithBanner = () => {
  const query = { type: "slot" };
  const {
    isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useGamesQuery({ limit: 12, ...query });
  const handleData = data ? data?.pages[0]?.data : [];

  const device = useDevice();
  const { template } = useUI();
  const handleConfig = theme_config(template);

  return (
    <div 
      className={`
        ${handleConfig?.theme !== 4 ? 
          "mt-10 md:mt-[77px]" : "container mx-auto"}`
      }
    >
      {!device.isMobileDevice ? (
        <CarouselSwiperWithBanner
          title="Slot"
          bannerImage={`/images/theme/${template}/slot/banner_slider.png`}
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
          showRTP={true}
          cardHeight="h-[206px]"
          type="slot"
        />
      ) : (
        <CarouselSwiperMultipleRowsWithBanner
          title="Slot"
          bannerImage={`/images/theme/${template}/slot/banner_slider.png`}
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
          showRTP={true}
          spaceBetween={10}
          cardHeight="h-[146px]"
          type="slot"
        />
      )}
    </div>
  );
};

export default SliderWithBanner;
