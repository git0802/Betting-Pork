import React, { useEffect, useState } from "react";
import SliderDesktop from "../sports/slider-desktop";
import { useGameTypeQuery } from "@framework/game/get-all-games-type";
import { SliderMobile } from "../sports//slider-mobile";
import { useDevice } from "@contexts/device-context";

const Slider = () => {
  const { data, isLoading } = useGameTypeQuery({
    type: "poker",
  });

  const device = useDevice();
  return (
    <>
      {!device.isMobileDevice ? (
        <SliderDesktop
          title="poker"
          type="poker"
          data={data?.data}
          isLoading={isLoading}
          showTotal={true}
        />
      ) : (
        <SliderMobile
          title="poker"
          type="poker"
          data={data?.data}
          isLoading={isLoading}
          showTotal={true}
        />
      )}
    </>
  );
};

export default Slider;
