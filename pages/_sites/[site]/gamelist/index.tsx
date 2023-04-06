/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from "react";
import MainLayout from "@components/layout/Main";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Tab, TabList, TabPanel, Tabs } from "@components/ui/tabs";
import Featured from "@components/gamelist/featured";
import Popular from "@components/gamelist/popular";
import New from "@components/gamelist/new";
import Banner from "@components/gamelist/banner";
import IconRecommend from "public/icons/header/recommend.svg";
import IconPopular from "public/icons/header/popular.svg";
import IconNew from "public/icons/header/new.svg";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

const Gamelist = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { group, tab },
  } = router;

  const currentTab = useMemo(() => {
    if (!tab) return 0;
    return Number(tab) ?? 0;
  }, [tab]);

  const handleChangeTab = (index: number) => {
    router.push(
      {
        pathname: `/gamelist`,
        query: { tab: index },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="container mx-auto md:px-mobile md:px-desktop mt-5 md:mt-0">
      <Tabs
        selectedIndex={currentTab}
        onSelect={handleChangeTab}
        selectedTabClassName={`bg-[#1AA9E7] text-white font-semibold first:rounded-l last:rounded-r px-3`}
      >
        <div className="flex flex-col w-full">
          <TabList className="w-full overflow-x-auto flex pl-0 px-desktop md:p-0 absolute mt-[10px] md:mt-[90px] z-10">
            <div className="flex items-center relative z-[2] text-sm md:text-base font-normal md:font-bold text-white rounded-tl-lg rounded-tr-lg py-[8px] md:py-0 px-4 md:px-0 w-full">
              <Tab
                key="featured"
                className={`py-[9px] rounded-l ${
                  currentTab === 0 ? "btn_featured1_active" : "btn_featured"
                } flex items-center gap-[5px] lg:gap-[10px] active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
              >
                <IconRecommend
                  className={`w-5 h-5 ${
                    currentTab === 0 ? "text-white" : "text-white/50"
                  } `}
                />
                <label>{t("common:text-featured")}</label>
              </Tab>
              <Tab
                key="featured"
                className={`py-[9px] ${
                  currentTab === 1 ? "btn_featured2_active" : "btn_featured"
                } flex items-center gap-[5px] lg:gap-[10px] active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
              >
                <IconPopular
                  className={`w-5 h-5 ${
                    currentTab === 1 ? "text-white" : "text-white/50"
                  } `}
                />
                <label>{t("common:text-popular")}</label>
              </Tab>
              <Tab
                key="featured"
                className={`py-[9px] rounded-r ${
                  currentTab === 2 ? "btn_featured3_active" : "btn_featured"
                } flex items-center gap-[5px] lg:gap-[10px] active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
              >
                <IconNew
                  className={`w-5 h-5 ${
                    currentTab === 2 ? "text-white" : "text-white/50"
                  } `}
                />
                <label>{t("common:text-latest")}</label>
              </Tab>
            </div>
          </TabList>
          <Banner />
          <div className="px-mobile px-desktop md:px-0">
            <TabPanel key="featured">
              <Featured />
            </TabPanel>
            <TabPanel key="popular">
              <Popular />
            </TabPanel>
            <TabPanel key="newest">
              <New />
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Gamelist;

Gamelist.Layout = MainLayout;

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
