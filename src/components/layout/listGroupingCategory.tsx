import React, { useMemo, useState } from "react";
import Featured from "../games/category/Featured";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Tab, TabList, TabPanel, Tabs } from "@components/ui/tabs";
import cn from "classnames";
import Popular from "@components/games/category/Popular";
import New from "@components/games/category/New";
import IconRecommend from "public/icons/header/recommend.svg";
import IconPopular from "public/icons/header/popular.svg";
import IconNew from "public/icons/header/new.svg";

const ListGroupingCategory = ({
  showPadding = true,
}: {
  showPadding?: boolean;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { tabRecommend, ...others },
  } = router;

  const currentTab = useMemo(() => {
    if (!tabRecommend) return 0;
    return Number(tabRecommend) ?? 0;
  }, [tabRecommend]);

  const handleChangeTab = (index: number) => {
    const p_name = router.pathname == '/home' ? '/home' : '/';
    router.push(
      {
        pathname: p_name,
        query: { tabRecommend: index },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section className="mt-0 px-mobile lg:px-0">
      <Tabs
        selectedIndex={currentTab}
        onSelect={handleChangeTab}
        selectedTabClassName={`bg-[#1AA9E7] text-white font-semibold first:rounded-l last:rounded-r md:rounded px-3`}
      >
        <TabList className="pl-0">
          <div className="flex items-center md:justify-start md:space-x-[10px] relative z-[2] text-sm md:text-base font-normal md:font-bold text-white rounded-tl-lg rounded-tr-lg py-[8px] md:py-0 w-full">
            <Tab
              className={`py-[9px] ${
                currentTab === 0
                  ? "bg-[#1AA9E7]"
                  : "bg-whiteDefault-20 md:bg-transparent rounded-l md:rounded-[4px]"
              } flex items-center gap-[5px] md:gap-[10px] hover:lg:bg-white/10 active:bg-white/20 active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
            >
              <IconRecommend
                className={`w-5 h-5 ${
                  currentTab === 0 ? "text-white" : "text-white/50"
                } `}
              />
              <label>{t("common:text-featured")}</label>
            </Tab>
            <Tab
              className={`py-[9px] ${
                currentTab === 1
                  ? "bg-[#B52BE6]"
                  : "bg-whiteDefault-20 md:bg-transparent md:rounded-[4px]"
              } flex items-center gap-[5px] md:gap-[10px] hover:lg:bg-white/10 active:bg-white/20 active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
            >
              <IconPopular
                className={`w-5 h-5 ${
                  currentTab === 1 ? "text-white" : "text-white/50"
                } `}
              />
              <label>{t("common:text-popular")}</label>
            </Tab>
            <Tab
              className={`py-[9px] ${
                currentTab === 2
                  ? "bg-[#E0A408]"
                  : "bg-whiteDefault-20 md:bg-transparent rounded-r md:rounded-[4px]"
              } flex items-center gap-[5px] md:gap-[10px] hover:lg:bg-white/10 active:bg-white/20 active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
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

        <TabPanel key="featured" className="rounded-bl-lg rounded-br-lg">
          <Featured type={0} />
        </TabPanel>
        <TabPanel key="popular" className="rounded-bl-lg rounded-br-lg">
          <Popular type={1} />
        </TabPanel>
        <TabPanel key="newest" className="rounded-bl-lg rounded-br-lg">
          <New type={2} />
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default ListGroupingCategory;
