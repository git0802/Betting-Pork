/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "@components/layout/Main";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUI } from "@contexts/ui-context";
import Button from "@components/ui/button";
import { useBannerQuery } from "@framework/banner/get-banner";
import { useRealMarketQuery } from "@framework/market/get-all-real-market";
import { useMarketDetailQuery } from "@framework/game/get-market-detail";
import { CardTogelV2 } from "@components/card/CardTogel";
import { CardTogelV2Mobile } from "@components/card/CardTogelMobile";
import TitlePage from "@components/ui/title/TitlePage";
import { CarouselSwiperBanner } from "@components/carousel/swiper";
import IconArrowToRight from "public/icons/arrow-to-right.svg";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { useDevice } from "@contexts/device-context";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

const ResultTogel = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
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

  const {
    openModal,
    setModalView,
    lobbyUrl,
    isPinVerified,
    isAuthorized,
    hasPin,
  } = useUI();

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const { data: dataBanner, isLoading: isLoadingBanner } = useBannerQuery({
    category: "banner-lottery",
  });

  const device = useDevice();

  return (
    <div className="container mx-auto px-mobile lg:mt-10 relative">
      <TitlePage
        page="togel"
        title="hasil pasaran"
        subtitle="hasil pasaran togel"
      />
      {dataBanner?.length > 0 && <CarouselSwiperBanner category="lottery" data={dataBanner} />}

      <div className="w-full lg:hidden flex justify-center">
        <Button
          type="button"
          variant="loadmore"
          onClick={() => {
            if (isPinVerified === true) {
              if (lobbyUrl) openInNewTab(lobbyUrl);
              else openInNewTab("#");
            } else if (!isAuthorized) {
              setModalView("LOGIN_VIEW");
              openModal();
            } else if (isAuthorized) {
              if (hasPin) setModalView("PIN_VERIFICATION");
              else setModalView("NEW_PIN");
              openModal();
            }
          }}
          className="flex items-center justify-center gap-[10px] w-fit h-11 mx-auto mt-[30px] px-5 md:mt-[60px] uppercase"
        >
          <span>lobby togel</span>
          <IconArrowToRight className="w-4 h-3" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[12px] gap-y-[19px] lg:gap-x-[15px] lg:gap-y-[22px] mt-[35px] lg:mt-[50px] mb-[18px] lg:mb-0">
        {isLoading ? "Loading" : null}
        {!device.isTabDevice &&
          modifiedData?.map((item) => (
            <CardTogelV2 key={item.market} data={item} />
          ))}
        {device.isTabDevice &&
          modifiedData?.map((item) => (
            <CardTogelV2Mobile key={item.market} data={item} />
          ))}
      </div>

      <div className="w-full hidden lg:flex justify-center">
        <Button
          type="button"
          variant="loadmore"
          onClick={() => {
            if (isPinVerified === true) {
              if (lobbyUrl) openInNewTab(lobbyUrl);
              else openInNewTab("#");
            } else if (!isAuthorized) {
              setModalView("LOGIN_VIEW");
              openModal();
            } else if (isAuthorized) {
              if (hasPin) setModalView("PIN_VERIFICATION");
              else setModalView("NEW_PIN");
              openModal();
            }
          }}
          className="flex items-center justify-center gap-[10px] w-fit h-11 mx-auto mt-10 px-5 md:mt-[60px] uppercase"
        >
          <span>lobby togel</span>
          <IconArrowToRight className="w-4 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default ResultTogel;

ResultTogel.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http.get(API_ENDPOINTS.DOMAINS);
  const domains = response.data.data;
  return {
    paths: domains.map((path: string) => ({
      params: {
        site: path,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  const {
    data: { data: config },
  } = await http.get(API_ENDPOINTS.DOMAIN + site);
  if (!config) return { notFound: true, revalidate: 10 };
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      config,
    },
    revalidate: 3600,
  };
};
