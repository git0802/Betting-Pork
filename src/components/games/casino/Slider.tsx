import React from "react";
import {
  CarouselLiveCasinoMultipleRows,
  CarouselSwiperLiveCasino,
  CarouselSwiperLiveCasinoMobile,
} from "@components/carousel/swiper";
import { useGameTypeQuery } from "@framework/game/get-all-games-type";
import { useDevice } from "@contexts/device-context";

const Slider = () => {
    const {
        isLoading,
        data,
        error,
    } = useGameTypeQuery({
        type: 'casino'
    });

    const device = useDevice();

  return (
    <div>
      {!device.isTabDevice ? (
        <div className="container mx-auto">
        <CarouselSwiperLiveCasino
          title="Live Casinos"
          data={data?.data}
          showTotal={true}
          showRTP={false}
          isLoading={isLoading}
        />
        </div>
      ) : (
        <CarouselSwiperLiveCasinoMobile
          title="Casinos"
          data={data?.data}
          showTotal={true}
          showRTP={false}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Slider;
