import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import Footer from "./Footer";
import MobileNavbar from "../../../theme/mobile_navbar";
import AppLogout from "@utils/AppLogout";
import Header from "../../../theme/header/index";
import { theme_config } from "@themes/config";
import { useUI } from "../../contexts/ui-context";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";
import GoogleAnalytics from "@components/google-analytics";
import * as ga from "@lib/google-analytics";
import { useRouter } from "next/router";
import { useMetaQuery } from "@framework/cms/get-meta";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import { getApiKey } from "@utils/functionutil";
interface Props {
  children: React.ReactNode;
}
interface IMetaProps {
  name: string | undefined;
  value: string | undefined
}

export default function MainLayout(props: Props) {
  const { isReady, template, title, isAuthorized, hasPin, isPinVerified, setModalView, openModal, setLobbyUrl, setLobbyResultUrl } = useUI();
  const handleConfig = theme_config(template);
  const router = useRouter();
  const isHome = router.basePath === ""
  // console.log("isHome",isHome);
  const { data: dataSosmed } = useQueryGetSosmed();
  const { data: dataMeta } = useMetaQuery();

  const analytics = useMemo(() => {
    const filterSosmed = dataSosmed?.find(
      (item: any) => item.name == "analytic"
    );
    const dataAnalytics = filterSosmed ? filterSosmed.value : "";
    return dataAnalytics;
  }, [dataSosmed]);

  const handleMeta = useMemo(() => {
    if (dataMeta) return dataMeta
  }, [dataMeta])

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url, analytics);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken);
    const lobby_url = CookieStorage.get(CookieKeys.LOBBY_URL);

    const handleLobbyUrl =
      lobby_url !== null
        ? lobby_url + "?player_token=" + token + "&api_key=" + getApiKey()
        : "/#";
    const handleLobbyResultUrl =
      lobby_url !== null
        ? lobby_url + "/result-market?player_token=" + token + "&api_key=" + getApiKey()
        : "/#";
    if (isPinVerified === true) {
      setLobbyUrl(handleLobbyUrl);
      setLobbyResultUrl(handleLobbyResultUrl);
    }
  }, [isAuthorized, isPinVerified]);

  useEffect(() => {
    if (isReady && isAuthorized) {
      if (hasPin === true && isPinVerified === false) {
        setModalView("PIN_VERIFICATION");
        openModal();
      }
      else if (hasPin === false && isPinVerified === false) {
        setModalView("NEW_PIN");
        openModal();
      }
    }
  }, [hasPin, isPinVerified]);

  // useEffect(() => {
  //   const pagesPathNeedVerification = ["deposits", "withdrawals", "wallet", "transaction", referral];
  //   const path = router.pathname.split("/")[0];
  //   console.log(path)
  //   if(isAuthorized && hasPin && !isPinVerified && pagesPathNeedVerification.indexOf(path) >= 0) {
  //     setModalView("PIN_VERIFICATION");
  //     openModal();
  //   }
  // }, [router])

  return (
    <AppLogout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        />
        {handleMeta && handleMeta.map((item:IMetaProps) => (
          <meta key={item.name} name={item.name} content={item.value} />
        ))}
        <meta property="og:title" content={title} key="title" />
        <link rel="icon" href={`/images/theme/${template}/favicon.ico`} />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link rel="stylesheet" href={`/styles/globals.${template}.css`} />
      </Head>
      {analytics && <GoogleAnalytics ga_id={analytics} />}
      <div className="">
        <Header type={handleConfig?.header} />
        <main className="min-h-[calc(100vh-600px)] mb-5 md:mb-0">
          {props.children}
        </main>
        <Footer />
        <MobileNavbar type={handleConfig?.mobile_navbar} />
      </div>
    </AppLogout>
  );
}
