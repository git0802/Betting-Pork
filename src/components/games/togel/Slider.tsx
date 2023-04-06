import React, { useMemo } from "react";
import {
  CarouselSwiperTogelV2,
  CarouselSwiperTogelV2Mobile,
} from "@components/carousel/swiper";
import { useRealMarketQuery } from "@framework/market/get-all-real-market";
import { useMarketDetailQuery } from "@framework/game/get-market-detail";
import { useDevice } from "@contexts/device-context";

const Slider = () => {
  const { data, isLoading } = useRealMarketQuery();
  const { data: dataMarketDetail, isLoading: isLoadingMarketDetail } =
    useMarketDetailQuery();

  const handleMarket = data?.market?.data;
  const handleMarketDetail = dataMarketDetail?.market?.data;

  const modifiedData = useMemo(() => {
    const params: any[] = [];
    handleMarket?.map((market) => {
      const dataFilter = handleMarketDetail?.filter(
        (item) => item.code === market.real_market
      );

      if (dataFilter && dataFilter[0]?.close_hours.length > 1) {
        let searchDate = dataFilter[0]?.close_date.substring(11, 19);
        let index = 0;
        for (let i = 0; i < dataFilter[0]?.close_hours?.length; i++) {
          if (dataFilter[0]?.close_hours[i].includes(searchDate)) {
            index = i;
          }
        }
        params.push({
          created_at: market.created_at,
          main_prize: market.main_prize,
          market_name: market.market_name,
          real_market: market.real_market,
          period: market.period,
          open_hours: [dataFilter?.[0]?.open_hours[index]],
          close_hours: [dataFilter?.[0]?.close_hours[index]],
        });
      } else {
        params.push({
          created_at: market.created_at,
          main_prize: market.main_prize,
          market_name: market.market_name,
          real_market: market.real_market,
          period: market.period,
          open_hours: dataFilter?.[0]?.open_hours,
          close_hours: dataFilter?.[0]?.close_hours,
        });
      }
    });
    return params;
  }, [isLoading, isLoadingMarketDetail]);

  const device = useDevice();

  return (
    <div>
      {!device.isTabDevice ? (
        <CarouselSwiperTogelV2
          title="Togel"
          data={modifiedData}
          isLoading={isLoading}
          showTotal={true}
          slidesPerView={"auto"}
        />
      ) : (
        <CarouselSwiperTogelV2Mobile
          title="Togel"
          data={modifiedData}
          isLoading={isLoading}
          showTotal={true}
          spaceBetween={10}
        />
      )}
    </div>
  );
};

export default Slider;
