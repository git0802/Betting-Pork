import DepositTabs from "/public/icons/header/deposit.svg";
import WithdrawTabs from "/public/icons/header/withdraw.svg";
import HistoryTabs from "/public/icons/header/history.svg";
import MainLayout from "@components/layout/Main";
import { Tab, TabList, TabPanel, Tabs } from "@components/ui/tabs";
import Deposit from "@components/wallet/Deposit";
import History from "@components/wallet/History";
import Withdraw from "@components/wallet/Withdraw";
import { useUserQuery } from "@framework/user/get-user-profile";
import { currencyFormat } from "@utils/functionutil";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import TitlePage from "@components/ui/title/TitlePage";
import { Menu } from "@headlessui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Tooltip } from "@components/common/tooltip/Tooltip";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useDevice } from "@contexts/device-context";
import { useUI } from "@contexts/ui-context";

const Wallet = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation("common");
  const { data: dataUser } = useUserQuery();
  const handleBalanceuser = dataUser?.balance ? dataUser?.balance : 0;
  const handleBalancePromotionuser = dataUser?.promotion_balance
    ? dataUser?.promotion_balance
    : 0;
  const router = useRouter();
  const { instantDepo } = useUI();
  const {
    query: { tab, type, instant },
  } = router;

  const [depositInstant, setDepositInstant] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    if (tab) {
      setCurrentTab(Number(tab));
    }
    setDepositInstant(instant === "true");
  }, [tab, instant]);

  const panelRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = (index: number) => {
    if (index == 0 && !device.isTabDevice) return;
    setCurrentTab(index);
  };

  useEffect(() => {
    scrollToTop();
  }, [currentTab]);

  const scrollToTop = () => {
    panelRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderHalaman = () => {
    return (
      <Deposit
        scrollToTop={scrollToTop}
        instant={depositInstant}
        setDepositInstant={setDepositInstant}
      />
    );
  };

  const renderHalaman2 = () => {
    return <Withdraw scrollToTop={scrollToTop} />;
  };

  const renderHalaman3 = () => {
    return <History scrollToTop={scrollToTop} />;
  };

  const device = useDevice();

  const mobileTabElement = (
    <div className="flex lg:hidden lg:flex-col justify-center mr-[0rem] p-0 w-full">
      <Tab value={0} className="!bg-transparent">
        <div
          className={`${
            currentTab == 0 ? "bg_tab_active" : "bg_tab_mobile"
          } tabMobile`}
        >
          <div className="tabItemsTop">
            <DepositTabs className="w-[28px] h-[28px]" />
          </div>
          <div className="tabItemsBottom">
            <span>{t("text-deposit")} </span>
          </div>
        </div>
      </Tab>
      <Tab value={1} className="!bg-transparent">
        <div
          className={`${
            currentTab == 1 ? "bg_tab_active" : "bg_tab_mobile"
          } tabMobile`}
        >
          <div className="tabItemsTop">
            <WithdrawTabs className="w-[28px] h-[28px]" />
          </div>
          <div className="tabItemsBottom">
            <span>{t("text-withdraw")}</span>
          </div>
        </div>
      </Tab>
      <Tab value={2} className="!bg-transparent">
        <div
          className={`${
            currentTab == 2 ? "bg_tab_active" : "bg_tab_mobile"
          } tabMobile`}
        >
          <div className="tabItemsTop">
            <HistoryTabs className="w-[28px] h-[28px]" />
          </div>
          <div className="tabItemsBottom">
            <span>{t("text-history")}</span>
          </div>
        </div>
      </Tab>
    </div>
  );

  const tabsElement = (
    <div className="bg_content_container hidden lg:flex lg:flex-col justify-between lg:space-y-[10px] rounded-[10px] mr-[0rem] lg:mr-11 p-[0.6rem] lg:p-[25px] w-full lg:w-fit">
      <Tab value={0} className="bg_tab border-0">
        {instantDepo == true ? (
          <div className="flex flex-row space-x-[10px] min-w-[0rem] lg:min-w-[12rem] items-center ">
            <DepositTabs className="w-5 h-5" />
            <Menu>
              <Menu.Button
                className={`flex flex-row space-x-[10px] items-center  w-full max-w-[13.65rem] text-lg active:text-[17px] justify-between transition-all duration-200 ease-in-out`}
              >
                <span className="text-lg font-bold">{t("text-deposit")}</span>
                <AiOutlineCaretDown className="w-3 h-3 " />
              </Menu.Button>

              <div className="absolute mt-[2rem] px-4 py-4 z-30 flex flex-col  ">
                <Menu.Items
                  className={`flex flex-col w-full min-w-[13.65rem]  mt-[6.5rem] ml-[-2.4rem]  max-w-[13.65rem] `}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "bg_select_list_item_active"
                        } bg_select_list_item text-lg font-bold px-4 py-2 border-b-[1px] border-bgMobile`}
                        onClick={() => {
                          setCurrentTab(0);
                          setDepositInstant(false);
                          scrollToTop();
                        }}
                      >
                        Normal
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "bg_select_list_item_active"
                        } bg_select_list_item text-lg font-bold px-4 py-2`}
                        onClick={() => {
                          setCurrentTab(0);
                          setDepositInstant(true);
                          scrollToTop();
                        }}
                      >
                        Instant
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </div>
            </Menu>
          </div>
        ) : (
          <div
            className="flex flex-row space-x-[10px] min-w-[0rem] lg:min-w-[12rem] items-center text-lg active:text-[17px] transition-all duration-200 ease-in-out"
            onClick={() => {
              setCurrentTab(0);
              setDepositInstant(false);
              scrollToTop();
            }}
          >
            <DepositTabs className="w-5 h-5" />
            <span className="font-semibold">{t("text-deposit")}</span>
          </div>
        )}
      </Tab>
      <Tab value={1} className="bg_tab border-0">
        <div className="flex flex-row space-x-[10px] items-center text-lg active:text-[17px] transition-all duration-200 ease-in-out">
          <WithdrawTabs className="w-5 h-5" />
          <span className="font-semibold">{t("text-withdraw")}</span>
        </div>
      </Tab>
      <Tab value={2} className="bg_tab border-0">
        <div className="flex flex-row space-x-[10px]  items-center text-lg active:text-[17px] transition-all duration-200 ease-in-out">
          <HistoryTabs className="w-5 h-5" />
          <span className="font-semibold">{t("text-history")}</span>
        </div>
      </Tab>
    </div>
  );
  return (
    <div className="container mx-auto">
      <TitlePage page="wallet" title={t("text-wallet")} subtitle="" />
      <div className="mt-5">
        <p className="text-sm font-medium text-[#6E8BA4] max-w-[500px]"></p>
        <Tabs selectedIndex={currentTab} onSelect={handleChangeTab}>
          <div className="flex flex-col w-full lg:flex-row mt-10 text-center lg:text-left">
            <div>
              <div className="mb-10 hidden lg:flex lg:flex-col w-[86%]  ">
                <p className="text-base text-grayDefault-60 font-normal">
                  Saldo
                </p>
                <h1 className="text-[32px] font-semibold  ">
                  Rp {currencyFormat(handleBalanceuser)}
                </h1>
                <hr className="my-[25px] border-whiteDefault-10" />
                <div className="flex flex-col">
                  <div className="mb-[11px] flex justify-between">
                    <span className="font-normal text-[14px] text-[#E1EDFF]/60">
                      Saldo Utama
                    </span>{" "}
                    <span className="font-semibold text-[16px] text-white">
                      Rp {currencyFormat(handleBalanceuser)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-normal flex items-center  text-[14px] text-[#E1EDFF]/60">
                      Saldo Bonus
                      <Tooltip value={t(`text-tooltip`)} className="ml-[0.5em]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.25 4.25H8.75V5.75H7.25V4.25ZM7.25 7.25H8.75V11.75H7.25V7.25ZM8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z"
                            fill="white"
                          />
                        </svg>
                      </Tooltip>
                    </span>{" "}
                    <span className="font-semibold text-[16px] text-white">
                      Rp {currencyFormat(handleBalancePromotionuser)}
                    </span>
                  </div>
                </div>
              </div>
              <TabList className={"flex flex-row w-full mb-8 lg:mb-0 p-0"}>
                {device.isTabDevice ? mobileTabElement : tabsElement}
              </TabList>
            </div>
            <div className="w-full justify-center" ref={panelRef}>
              <TabPanel key="0">{renderHalaman()}</TabPanel>
              <TabPanel key="1">{renderHalaman2()} </TabPanel>
              <TabPanel key="2">{renderHalaman3()}</TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;

Wallet.Layout = MainLayout;

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
