import React from 'react';
import { useBannerQuery } from '@framework/banner/get-banner';
import { useTranslation } from 'next-i18next';
import { SwiperBannerKS } from "@components/carousel/swiper-banner-ks";
import SearchGameKS from "../../../src/components/layout/SearchGameKS";
import { useDevice } from '@contexts/device-context';
import { theme_config } from '@themes/config';
import { useUI } from '../../contexts/ui-context';

const BannerT4 = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useBannerQuery({
    category: "banner"
  });
  const { template } = useUI();
  const device = useDevice();
  // const handleConfig = theme_config(template);

  return (
    <>
      <div
        className="banner_bg_pattern"
      >
        <div className="container mx-auto">
          <div className="w-full max-w-[1110px] mx-auto">
            <SwiperBannerKS
              page="home"
              data={data}
              spaceBetween={0}
              isLoading={isLoading}
            />
            <div
              className=""
            ></div>
          </div>
        </div>
      </div>
      <div
        className="bg_header_4_mobile_search lg:hidden"
      >
        <SearchGameKS
          placeholder={t("forms:placeholder-search-game")}
          filterPosition="right-0"
          position="header"
          alignItem="justify-center"
          inputWidth="w-[250px]"
        />
      </div>
    </>
  )
}

export default BannerT4