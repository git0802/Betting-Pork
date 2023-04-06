import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Tab, TabList, TabPanel, Tabs } from "@components/ui/tabs";
import cn from "classnames";

import Featured from "../games/category-ks/Featured";
import Popular from "@components/games/category-ks/Popular";
import New from "@components/games/category-ks/New";

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
    <section className="w-full mt-0">
      <div className="lg:container -px-[10px] lg:mx-auto w-full">
        <Tabs
          selectedIndex={currentTab}
          onSelect={handleChangeTab}
          selectedTabClassName={`text-white font-semibold first:rounded-l last:rounded-r md:rounded px-3`}
          className="w-full"
        >
          <TabList className="tab_featured">
            <div className="flex items-center md:justify-start md:space-x-[10px] relative z-[2] text-sm md:text-base font-normal md:font-bold rounded-tl-lg rounded-tr md:py-0 px-mobile md:px-0 w-full">
              <Tab
                className={`py-[9px] ${currentTab === 0
                    ? "btn_featured1_active"
                    : "btn_featured"
                  } flex items-center gap-[5px] md:gap-[10px] active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
              >
                <IconRecommend
                  className={`w-5 h-5`}
                />
                <label>{t("common:text-featured")}</label>
              </Tab>
              <Tab
                className={`py-[9px] ${currentTab === 1
                    ? "btn_featured2_active"
                    : "btn_featured"
                  } flex items-center gap-[5px] md:gap-[10px] active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
              >
                <IconPopular
                  className={`w-5 h-5`}
                />
                <label>{t("common:text-popular")}</label>
              </Tab>
              <Tab
                className={`py-[9px] ${currentTab === 2
                    ? "btn_featured3_active"
                    : "btn_featured"
                  } flex items-center gap-[5px] md:gap-[10px] active:translate-y-1 transition-all duration-200 ease-in-out h-11 font-semibold`}
              >
                <IconNew
                  className={`w-5 h-5`}
                />
                <label>{t("common:text-latest")}</label>
              </Tab>
            </div>
          </TabList>
          <div className="border_cont_featured md:hidden"></div>
          <TabPanel key="featured" className="featured_panel">
            <Featured type={0} />
          </TabPanel>
          <TabPanel key="popular" className="featured_panel">
            <Popular type={1} />
          </TabPanel>
          <TabPanel key="newest" className="featured_panel">
            <New type={2} />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default ListGroupingCategory;
