import IconTransaction from "public/icons/header/transaction.svg";
import IconLottery from "public/icons/header/togel.svg";
import IconLivegame from "public/icons/header/livegame.svg";

import MainLayout from "@components/layout/Main";
import ALLTransaction from "@components/transaction/ALLTransaction";
import ALLTransactionLivegame from "@components/transaction/ALLTransactionLivegame";
import ALLTransactionLottery from "@components/transaction/ALLTransactionLottery";
import DetailTransactionAll from "@components/transaction/DetailTransactionAll";
import DetailTransactionLotery from "@components/transaction/DetailTransactionLotery";
import { Tab, TabList, TabPanel, Tabs } from "@components/ui/tabs";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import TitlePage from "@components/ui/title/TitlePage";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

const Transaction = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation("common");
  const { openModal, setModalView, isAuthorized, isReady } = useUI();

  useEffect(() => {
    if (isReady && !isAuthorized) {
      setModalView("LOGIN_VIEW");
      return openModal();
    }
  }, [isReady, isAuthorized]);

  const router = useRouter();
  const {
    query: { tab, type },
  } = router;
  const [Data, setData] = useState();
  const [Type, setType] = useState("");

  const currentTab = useMemo(() => {
    if (!tab) return 0;
    return Number(tab) ?? 0;
  }, [tab, type]);

  const handleChangeTab = (index: number) => {
    setType("");
    router.push(
      {
        pathname: `/transaction`,
        query: { tab: index },
      },
      undefined,
      { shallow: true }
    );
  };

  const renderHalaman = () => {
    if (Type == "detaildata") {
      return <DetailTransactionAll Data={Data} setType={setType} />;
    } else if (Type == "detaillotery") {
      return <DetailTransactionLotery Data={Data} setType={setType} />;
    } else {
      return <ALLTransaction setData={setData} setType={setType} />;
    }
  };

  const renderHalaman2 = () => {
    if (Type == "detaildata") {
      return <DetailTransactionAll Data={Data} setType={setType} />;
    } else if (Type !== "detaillotery") {
      return <ALLTransactionLottery setData={setData} setType={setType} />;
    } else {
      return <DetailTransactionLotery Data={Data} setType={setType} />;
    }
  };

  const renderHalaman3 = () => {
    if (Type !== "detaildata") {
      return <ALLTransactionLivegame setData={setData} setType={setType} />;
    } else if (Type == "detaildata") {
      return <DetailTransactionAll Data={Data} setType={setType} />;
    } else {
      return <DetailTransactionLotery Data={Data} setType={setType} />;
    }
  };

  // const background = "#0C2D46";

  return (
    <div className="container mx-auto">
      <>
        <TitlePage
          page="transaction"
          title={t("common:text-transaction")}
          subtitle={t("common:text-transaction-header")}
        />
        <div className="mt-5">
          <div className="flex flex-col w-full sp lg:flex-row mt-10 text-center lg:text-left">
            <div className=" lg:w-3/12">
              <Tabs selectedIndex={currentTab} onSelect={handleChangeTab}>
                <TabList className={"flex flex-row w-full mb-8 lg:mb-0 p-0"}>
                  <div className={`bg_content_container hidden lg:flex lg:flex-col justify-between lg:space-y-[10px] rounded-[10px] mr-[0rem] lg:mr-10 p-[0.6rem] lg:p-[25px] w-full `}>
                    <Tab
                      value={0}
                      className="bg_tab border-0 rounded-[5px]"
                    >
                      <div className="flex flex-row space-x-2 items-center text-lg active:text-[17px] transition-all duration-200 ease-in-out py-[6px]">
                        <IconTransaction className="w-5 h-5" />
                        <span className="font-bold">
                          {t("text-all-trasaction")}
                        </span>
                      </div>
                    </Tab>
                    <Tab
                      value={1}
                      className="bg_tab border-0 rounded-[5px]"
                    >
                      <div className="flex flex-row space-x-2 items-center text-lg active:text-[17px] transition-all duration-200 ease-in-out py-[6px]">
                        <IconLottery className="w-5 h-5" />
                        <span className="font-bold">
                          {t("text-all-lotrery")}
                        </span>
                      </div>
                    </Tab>
                    <Tab
                      value={2}
                      className="bg_tab border-0 rounded-[5px]"
                    >
                      <div className="flex flex-row space-x-2 items-center text-lg active:text-[17px] transition-all duration-200 ease-in-out py-[6px]">
                        <IconLivegame className="w-5 h-5" />
                        <span className="font-bold">
                          {t("text-live-game")}
                        </span>
                      </div>
                    </Tab>
                  </div>

                  <div className="flex lg:hidden lg:flex-col justify-center mr-[0rem] p-0 w-full">
                    <Tab value={0}>
                      <div
                        className={`${
                          currentTab == 0 ? "bg_tab_active" : "bg_tab_mobile"
                        } tabMobile`}
                      >
                        <div className="tabItemsTop">
                          <IconTransaction className="w-[28px] h-[28px]" />
                        </div>
                        <div className="tabItemsBottom">
                          <span>{t("text-all-trasaction")}</span>
                        </div>
                      </div>
                    </Tab>
                    <Tab value={1}>
                      <div
                        className={`${
                          currentTab == 1 ? "bg_tab_active" : "bg_tab_mobile"
                        } tabMobile`}
                      >
                        <div className="tabItemsTop">
                          <IconLottery className="w-[28px] h-[28px]" />
                        </div>
                        <div className="tabItemsBottom">
                          <span>{t("text-all-lotrery")}</span>
                        </div>
                      </div>
                    </Tab>
                    <Tab value={2}>
                      <div
                        className={`${
                          currentTab == 2 ? "bg_tab_active" : "bg_tab_mobile"
                        } tabMobile`}
                      >
                        <div className="tabItemsTop">
                          <IconLivegame className="w-[28px] h-[28px]" />
                        </div>
                        <div className="tabItemsBottom">
                          <span>{t("text-live-game")}</span>
                        </div>
                      </div>
                    </Tab>
                  </div>
                </TabList>
              </Tabs>
            </div>
            <div className="w-full lg:w-9/12 ">
              <Tabs selectedIndex={currentTab} className="">
                <TabPanel key="0">{renderHalaman()}</TabPanel>
                <TabPanel key="1">{renderHalaman2()} </TabPanel>
                <TabPanel key="2">{renderHalaman3()}</TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Transaction;

Transaction.Layout = MainLayout;

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
