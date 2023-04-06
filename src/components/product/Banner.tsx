import React from "react";
import { CarouselSwiperBanner } from "@components/carousel/swiper";

const LandingPageBanner = ({ data }: { data: any }) => {
  return (
    <>
      <CarouselSwiperBanner
        data={data}
      />
    </>
  );
};

export default LandingPageBanner;
