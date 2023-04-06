import React, { lazy, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Image from "next/image";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import ListMenuGameType from "./ListMenuGameType";
import ListSubMenu from "./ListSubMenu";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui-context";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import IconSpeaker from "public/icons/header/1/speaker.svg";
import SearchGame from "@components/layout/SearchGame";
import LogoMobile from "public/images/logo-mobile.png";
import SwitchLanguage from "@components/ui/SwitchLanguage";
import { useDevice } from "@contexts/device-context";
import { getApiKey } from "@utils/functionutil";

const UserBalance = lazy(() => import("@components/layout/balance"));
const NotificationHeader = dynamic(
  () => import("@components/notification/header"),
  {
    ssr: false,
  }
);

const HeaderUserMenu = dynamic(
  () => import("@components/layout/HeaderUserMenu"),
  {
    ssr: false,
  }
);

const Header = () => {
  const { t } = useTranslation("common");
  const token = CookieStorage.get(CookieKeys.AuthToken);
  const { openModal, setModalView, setLobbyUrl, isAuthorized } = useUI();
  const [isLoggin, setIsLoggin] = useState(false);

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  const device = useDevice();
  // const isMobile = MediaMobile();
  // const isTab = MediaTab();

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  function handleRegister() {
    if (device.isTabDevice) Router.push("/register");
    else {
      setModalView("SIGN_UP_VIEW");
      return openModal();
    }
  }

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken);
    const lobby_url = CookieStorage.get(CookieKeys.LOBBY_URL);

    const handleLobbyUrl =
      lobby_url !== null
        ? lobby_url + "/?player_token=" + token + "&api_key=" + getApiKey()
        : "/#";
    if (isAuthorized) {
      setIsLoggin(true);
      setLobbyUrl(handleLobbyUrl);
    } else {
      setIsLoggin(false);
    }
  }, [isAuthorized]);

  const marquee_blur: [number, number, number] = [45, 48, 53];
  const marquee_blur_mobile: [number, number, number] = [28, 30, 34];

  const input_background = "bg-transparent";
  const input_border =
    "border border-transparent hover:border-[#FF3D57] focus-within:border-[#FF3D57]";
  const divide_search_game = "after:border-[rgba(255,255,255,0.15)]";
  const bg_marquee_mobile = "bg-[#1C1E22]";

  return (
    <>
      <div
        className={`background_web absolute -z-[1] top-0 w-full h-[600px]`}
        // style={{ background: `${style.background_web}` }}
      >
        {""}
      </div>
      {/* mobile */}
      {device.isTabDevice ? (
        <header className="container mx-auto">
          <div className="px-[18px] md:px-0 relative z-20">
            <div className="flex items-center justify-between lg:px-0 pt-6 lg:justify-start">
              <div className="flex flex-row items-center justify-between w-full lg:hidden">
                <Image
                  alt=""
                  src={LogoMobile}
                  priority
                  width={50}
                  height={50}
                  quality={100}
                  objectFit="contain"
                  objectPosition="left"
                  onClick={() => {
                    Router.replace(token ? "/home" : "/");
                  }}
                />
                {!isLoggin ? (
                  <div
                    className={`${
                      isLoggin ? "hidden" : "flex"
                    } items-center md:ml-12 gap-[10px]`}
                  >
                    <Button
                      onClick={handleLogin}
                      type="button"
                      variant="transparent"
                      className="w-fit text-sm px-4 py-2 md:h-[38px] font-extrabold uppercase"
                    >
                      {t("common:text-login")}
                    </Button>
                    <Button
                      onClick={handleRegister}
                      type="button"
                      variant="primary"
                      className="w-fit text-sm px-4 py-2 md:h-[38px] font-extrabold uppercase"
                    >
                      {t("common:text-register")}
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                {isLoggin ? (
                  <>
                    <UserBalance />
                    <NotificationHeader />
                    <HeaderUserMenu />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div
              className={`${bg_marquee_mobile} px-mobile flex flex-row gap-2 items-center`}
            >
              <IconSpeaker />
              <Marquee
                className="bg-transparent h-[24px] text-xs text-[rgba(255,255,255,0.5)]"
                gradient={true}
                gradientColor={marquee_blur_mobile}
                gradientWidth={80}
                pauseOnHover
              >
                {" "}
                Nantikan Permainan Kasino Terbaru Setiap Minggunya! Jadilah
                orang pertama yang merasakan sensasi dan pengalaman pada
                permainan terbaru kami di setiap minggunya, Main sekarang juga
                di AVATAR TOTO!
              </Marquee>
            </div>
          </div>
        </header>
      ) : null}

      {/* desktop */}
      {!device.isTabDevice ? (
        <header>
          <div className="background_header">
            <div className="container mx-auto">
              <div className="flex flex-row gap-2 items-center">
                <div className="text-sm w-[160px]">
                  {dateState.toLocaleDateString("ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  {dateState.toLocaleString("ID", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })}
                </div>
                <IconSpeaker />
                <Marquee
                  className="bg-transparent h-[42px]"
                  gradient={true}
                  gradientColor={marquee_blur}
                  gradientWidth={80}
                  pauseOnHover
                >
                  {" "}
                  Nantikan Permainan Kasino Terbaru Setiap Minggunya! Jadilah
                  orang pertama yang merasakan sensasi dan pengalaman pada
                  permainan terbaru kami di setiap minggunya, Main sekarang juga
                  di AVATAR TOTO!
                </Marquee>
                <div className="w-[200px]">
                  <SwitchLanguage
                    padding="py-0 pl-3 pr-10"
                    background="bg-transparent"
                    flagSize="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-transparent">
            {/* Top */}
            <div className={`h-[140px] background_header`}>
              <div className="container mx-auto">
                <div className="grid grid-cols-3 h-[100px]">
                  <div className="flex flex-row items-center">
                    <div className="w-[184px]">
                      <Link
                        href={token ? "/home" : "/"}
                        className="h-[44px] max-w-[178px] relative"
                      >
                        <Image
                          alt=""
                          src="/images/logo.png"
                          className="cursor-pointer"
                          priority
                          width={195}
                          height={68}
                          quality={100}
                          objectFit="contain"
                          objectPosition="left"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ListSubMenu />
                  </div>
                  <div className="flex items-center justify-end">
                    {!isLoggin ? (
                      <div className="flex items-center gap-[10px] xl:ml-12">
                        <Button
                          onClick={handleLogin}
                          type="button"
                          variant="transparent"
                          className="md:w-fit text-sm md:px-5 h-11 font-extrabold uppercase"
                        >
                          {t("common:text-login")}
                        </Button>
                        <Button
                          onClick={handleRegister}
                          type="button"
                          variant="primary"
                          className="md:w-fit text-sm md:px-5 h-11 font-extrabold uppercase"
                        >
                          {t("common:text-register")}
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                    {isLoggin ? (
                      <div
                        className={`${
                          isLoggin ? "flex" : "hidden"
                        } flex-row gap-3 xl:gap-[1.5rem] items-center xl:ml-12`}
                      >
                        <UserBalance />
                        <NotificationHeader />
                        <HeaderUserMenu />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="-mt-10">
              <div className="container mx-auto">
                <div className="background_subheader">
                  <div
                    className={`w-2/12 flex items-center justify-start after:content-[''] after:absolute after:-right-1 after:border-r ${divide_search_game} after:h-[28px] relative`}
                  >
                    <SearchGame
                      showFilter={false}
                      inputBackground={input_background}
                      inputBorder={input_border}
                      inputWidth="w-full"
                      position="header"
                      placeholder={t("forms:placeholder-search-game")}
                      filterPosition="left-0"
                    />
                  </div>
                  <div className="w-10/12 flex items-center justify-center">
                    <ListMenuGameType />
                  </div>
                  <div className="w-2/12 flex items-center justify-end">
                    <SearchGame
                      showSearch={false}
                      showFilterText={false}
                      alignItem="justify-end"
                      position="header"
                      placeholder={t("forms:placeholder-search-game")}
                      filterPosition="right-0"
                    />
                  </div>
                  {/* <div className="flex">
                  <div
                    className="h-[77px] flex items-center justify-end"
                  >
                    <SearchGame
                      placeholder={t("forms:placeholder-search-game")}
                      filterPosition="left-0"
                    />
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
};

export default Header;
