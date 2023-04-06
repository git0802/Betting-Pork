import React from "react";
import MainLayout from "@components/layout/Main";
import SliderCasino from "@components/games/casino/Slider";
import SliderArcade from "@components/games/arcade/Slider";
import SliderTogel from "@components/games/togel/Slider";
import SectionPokerSports from "@components/section/poker-sports";
import FooterCMS from "@components/cms/footer-detail";
import LandingPageBanner from "@components/layout/landingPageBanner";
import type { GetStaticPaths, GetStaticProps } from "next";
import http from "@framework/utils/http-server";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useUI } from "@contexts/ui-context";
import Featured_Slot from "@components/layout/featured-slot";
import { theme_config } from "@themes/config";
import FABCountdown from "@components/gamelist/FAB/countdown";

const Home = ({ config }: DefaultPageProps) => {
  const { isAuthorized, template, liveEvent } = useUI();
  const handleConfig = theme_config(template);
  return (
    <>
      {liveEvent === true && <FABCountdown />}
      <LandingPageBanner />
      <Featured_Slot />
      <SliderTogel />
      <SliderCasino />
      <SliderArcade />
      <SectionPokerSports />
      {!isAuthorized && <FooterCMS />}
    </>
  );
};

export default Home;

Home.Layout = MainLayout;

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
