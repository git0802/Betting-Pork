import React, { useEffect, useState } from "react";
import { useGameTypeQuery } from "@framework/game/get-all-games-type";
import SliderDesktop from "./slider-desktop";
import { SliderMobile } from "./slider-mobile";
import { useDevice } from "@contexts/device-context";

const Slider = () => {
  const { isLoading, data, error } = useGameTypeQuery({
    type: "sport",
  });

  const handleData = data?.data;

  const device = useDevice();

  return (
    <div>
      {!device.isMobileDevice ? (
        <SliderDesktop
          title="sports"
          type="sports"
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
        />
      ) : (
        <SliderMobile
          title="sports"
          type="sports"
          data={handleData}
          isLoading={isLoading}
          showTotal={true}
        />
      )}
    </div>
  );
};

export default Slider;
