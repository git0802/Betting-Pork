import React from 'react';
import { CarouselSwiperBanner } from "@components/carousel/swiper";
import SearchGame from "@components/layout/SearchGame";
import { useBannerQuery } from '@framework/banner/get-banner';
import { useTranslation } from 'next-i18next';

const BannerT1 = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useBannerQuery({
    category: "banner"
  });
  return (
    <div className="container mx-auto">
      <div className="px-[18px] md:px-0">
        {data && !isLoading &&
          <CarouselSwiperBanner
            page="home"
            data={data}
          />
        }
      </div>
      <div className="block mt-5 mb-[30px] lg:hidden">
        <SearchGame
          px={true}
          position="pages"
          placeholder={t("forms:placeholder-search-game")}
          inputWidth="w-[calc(100vw-96px-36px)] md:w-[calc(768px-96px-36px)]"
        />
      </div>
    </div>
  )
}

export default BannerT1