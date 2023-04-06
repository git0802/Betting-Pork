import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui-context";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import IconSpeaker from "public/icons/header/1/speaker.svg";
import LogoMobile from "public/images/logo-mobile.png";
import dynamic from "next/dynamic";
import { useDevice } from "@contexts/device-context";

const SwitchLanguage = dynamic(() => import("@components/ui/SwitchLanguage"));
const SearchGame = dynamic(() => import("@components/layout/SearchGame"));
const Marquee = dynamic(() => import("react-fast-marquee"));
const ListMenuGameType = dynamic(() => import("./ListMenuGameType"));
const ListSubMenu = dynamic(() => import("./ListSubMenu"));
const UserBalance = dynamic(() => import("@components/layout/balance"));
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
    if (token !== undefined) {
      setIsLoggin(true);
    } else {
      setIsLoggin(false);
    }
  }, [token]);

  const marqueeBlurTG: [number, number, number] = [39, 31, 49];

  return (
    <>
      <div className="background_web absolute -z-[1] top-0 w-full h-[600px]">
        {""}
      </div>
      {/* mobile */}
      {device.isMobileDevice ? (
        <header className="container mx-auto">
          <div className="px-[18px] lg:px-0 relative z-20">
            <div className="flex items-center justify-between lg:px-0 pt-6 md:py-[2.2rem] lg:justify-start">
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
        </header>
      ) : null}

      {/* desktop */}
      {!device.isMobileDevice ? (
        <header className="bg-transparent">
          <div className="bg_header2_marquee">
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
                  className="bg-transparent H-[42PX]"
                  gradient={true}
                  gradientColor={marqueeBlurTG}
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
          </div>
          <div>
            {/* Top */}
            <div className="bg_header2_top">
              <div className="container mx-auto">
                <div className="flex flex-row items-center justify-between w-full">
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
                          height={70}
                          quality={100}
                          objectFit="contain"
                          objectPosition="left"
                        />
                      </Link>
                    </div>
                    <div>
                      <ListSubMenu />
                    </div>
                  </div>
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
                      <SwitchLanguage
                        showText={false}
                        padding="px-6"
                        background="bg-transparent"
                      />
                      <NotificationHeader />
                      <HeaderUserMenu />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="bg_header2_bottom_cont">
              <div className="container mx-auto">
                <div className="bg_header2_bottom flex flex-row items-center justify-between">
                  <div className="py-[14px]">
                    <ListMenuGameType />
                  </div>
                  <div className="flex">
                    <div className="bg_header2_bottom_search h-[77px] flex items-center justify-end">
                      <SearchGame
                        inputWidth="w-[200px]"
                        inputBackground="bg-transparent"
                        inputBorder="border-none"
                        searchPosition="right-0"
                        filterPosition="right-0"
                        position="header"
                        showFilterText={false}
                        placeholder={t("forms:placeholder-search-game")}
                      />
                    </div>
                  </div>
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
