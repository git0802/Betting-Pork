import React, { useEffect, useMemo } from "react";
import MainLayout from "@components/layout/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PersonalDetail from "@components/user-information/PersonalDetail";
import PaymentChannel from "@components/user-information/PaymentChannel";
import Password from "@components/user-information/Password";
import Email from "@components/user-information/Email";
import CodePin from "@components/user-information/CodePin";
import TitlePage from "@components/ui/title/TitlePage";
import IconPersonal from "public/icons/header/personal.svg";
import IconPayment from "public/icons/header/payment.svg";
import IconPassword from "public/icons/header/password.svg";
import IconEmail from "public/icons/header/email.svg";
import IconPin from "public/icons/header/pin.svg";
import http from "@framework/utils/http-server";
import { GetStaticPaths, GetStaticProps } from "next";
import { DefaultPageProps } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useUI } from "@contexts/ui-context";

const UserInformation = ({ config }: DefaultPageProps) => {
  const { t } = useTranslation("common");
  const { openModal, setModalView, isAuthorized, isReady } = useUI();
  const router = useRouter();
  const {
    query: { tab },
  } = router;

  useEffect(() => {
    if (isReady && !isAuthorized) {
      setModalView("LOGIN_VIEW");
      return openModal();
    }
  }, [isReady, isAuthorized]);

  const currentTab = useMemo(() => {
    if (!tab) return 0;
    return Number(tab) ?? 0;
  }, [tab]);

  const handleChangeTab = (index: number) => {
    router.push(
      {
        pathname: `/userinformation`,
        query: { tab: index },
      },
      undefined,
      { shallow: true }
    );
  };

  const renderContent = useMemo(() => {
    switch (currentTab) {
      case 0:
        return <PersonalDetail />;
      case 1:
        return <PaymentChannel />;
      case 2:
        return <Password />;
      case 3:
        return <Email />;
      case 4:
        return <CodePin />;
      default:
        return <PersonalDetail />;
    }
  }, [currentTab]);

  return (
    <div className="container mx-auto">
      <>
        <TitlePage page="profil" title="PROFIL" />
        <div className="lg:mt-10 w-full flex lg:flex-row flex-col lg:space-x-10 tracking-normal">
          <div
            className={`bg_content_container hidden lg:flex lg:flex-col lg:p-6 p-2 lg:space-y-4 space-x-4 lg:space-x-0 w-[300px] lg:rounded-[10px] lg:overflow-x-hidden overflow-x-auto  lg:relative absolute left-0 right-0 scrollbar-hide h-min`}
          >
            <button
              onClick={() => handleChangeTab(0)}
              className={`rounded-[4px] h-11 w-full ${
                currentTab === 0 ? "bg_tab_active" : "bg_tab"
              } tabDesktop`}
            >
              <IconPersonal className="w-5 h-5" />
              {t("text-personal-detail")}
            </button>
            <button
              onClick={() => handleChangeTab(1)}
              className={`rounded-[4px] h-11 w-full ${
                currentTab === 1 ? "bg_tab_active" : "bg_tab"
              } tabDesktop`}
            >
              <IconPayment className="w-5 h-5" />
              {t("text-add-rekening")}
            </button>
            <button
              onClick={() => handleChangeTab(2)}
              className={`rounded-[4px] h-11 w-full ${
                currentTab === 2 ? "bg_tab_active" : "bg_tab"
              } tabDesktop`}
            >
              <IconPassword className="w-5 h-5" />
              {t("text-password")}
            </button>
            <button
              onClick={() => handleChangeTab(3)}
              className={`rounded-[4px] h-11 w-full ${
                currentTab === 3 ? "bg_tab_active" : "bg_tab"
              } tabDesktop`}
            >
              <IconEmail className="w-5 h-5" />
              {t("text-email")}
            </button>
            <button
              onClick={() => handleChangeTab(4)}
              className={`rounded-[4px] h-11 w-full ${
                currentTab === 4 ? "bg_tab_active" : "bg_tab"
              } tabDesktop`}
            >
              <IconPin className="w-5 h-5" />
              {t("text-code-pin")}
            </button>
          </div>
          <div className="flex flex-row lg:hidden px-mobile px-desktop py-2 space-x-4 overflow-x-auto left-0 right-0 scrollbar-hide h-min">
            <button
              onClick={() => handleChangeTab(0)}
              className={`${
                currentTab === 0 ? "bg_tab_active" : "bg_tab_mobile"
              } tabMobile`}
            >
              <div className="tabItemsTop">
                <IconPersonal className="w-[28px] h-[28px]" />
              </div>
              <div className="tabItemsBottom">
                <span className="capitalize">{t("text-personal-detail")}</span>
              </div>
            </button>
            <button
              onClick={() => handleChangeTab(1)}
              className={`${
                currentTab === 1 ? "bg_tab_active" : "bg_tab_mobile"
              } tabMobile`}
            >
              <div className="tabItemsTop">
                <IconPayment className="w-[28px] h-[28px]" />
              </div>
              <div className="tabItemsBottom">
                <span className="capitalize">{t("text-add-rekening")}</span>
              </div>
            </button>
            <button
              onClick={() => handleChangeTab(2)}
              className={`${
                currentTab === 2 ? "bg_tab_active" : "bg_tab_mobile"
              } tabMobile`}
            >
              <div className="tabItemsTop">
                <IconPassword className="w-[28px] h-[28px]" />
              </div>
              <div className="tabItemsBottom">
                <span className="capitalize">{t("text-password")}</span>
              </div>
            </button>
            <button
              onClick={() => handleChangeTab(3)}
              className={`${
                currentTab === 3 ? "bg_tab_active" : "bg_tab_mobile"
              } tabMobile`}
            >
              <div className="tabItemsTop">
                <IconEmail className="w-[28px] h-[28px]" />
              </div>
              <div className="tabItemsBottom">
                <span className="capitalize">{t("text-email")}</span>
              </div>
            </button>
            <button
              onClick={() => handleChangeTab(4)}
              className={`${
                currentTab === 4 ? "bg_tab_active" : "bg_tab_mobile"
              } tabMobile`}
            >
              <div className="tabItemsTop">
                <IconPin className="w-[28px] h-[28px]" />
              </div>
              <div className="tabItemsBottom">
                <span className="capitalize">{t("text-code-pin")}</span>
              </div>
            </button>
          </div>
          <div className="w-full flex-1 flex flex-col lg:mt-0 mt-5 md:px-mobile lg:px-0 justify-start">
            {renderContent}
          </div>
        </div>
      </>
    </div>
  );
};

export default UserInformation;

UserInformation.Layout = MainLayout;

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
