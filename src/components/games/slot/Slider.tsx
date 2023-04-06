import React, { useEffect, useState } from "react";
import {
  CarouselSwiper,
  CarouselSwiperMultipleRows,
  CarouselSwiperWithBanner,
  CarouselSwiperWithBannerMobile,
} from "@components/carousel/swiper";
import { useGamesQuery } from "@framework/game/get-all-games";
import { useDevice } from "@contexts/device-context";
import { theme_config } from "@themes/config";
import { useUI } from "../../../contexts/ui-context";

const Slider = () => {
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
        ${
          handleConfig?.theme !== 4 ? "mt-10 md:mt-[77px]" : ""
        } relative z-[1]`}
    >
      {/* {!device.isMobileDevice ? (
        <CarouselSwiper
          title="Slot"
          bannerImage="/images/slot/banner.png"
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
          showRTP={true}
          style="aspec-123/165 h-[165px] lg:aspect-225/168 lg:h-[168px]"
          type="slot"
        />
      ) : (
        <CarouselSwiperMultipleRows
          title="Slot"
          bannerImage="/images/slot/banner.png"
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
          showRTP={true}
          spaceBetween={10}
          style="aspec-123/165 h-[165px] lg:aspect-225/168 lg:h-[168px]"
          type="slot"
        />
      )} */}
      {!device.isTabDevice ? (
        <CarouselSwiperWithBanner
          title="Slot"
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
          showRTP={true}
          cardHeight="aspec-165/123 w-[165px] lg:aspect-225/206 lg:w-[225px]"
          type="slot"
        />
      ) : (
        <CarouselSwiperWithBannerMobile
          title="Slot"
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
          showRTP={true}
          cardHeight="aspec-165/123 w-[165px] lg:aspect-225/206 lg:w-[225px]"
          type="slot"
        />
      )}
    </div>
  );
};

export default Slider;
