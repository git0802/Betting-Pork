import { useUI } from "@contexts/ui-context";
import { Popover } from "@headlessui/react";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import { addActiveScroll } from "@utils/add-active-scroll";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router from "next/router";
import React, { lazy, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SearchGame from "@components/layout/SearchGame";
import Button from "@components/ui/button";
import Link from "next/link";
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

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const Header = () => {
  const {
    openModal,
    setModalView,
    setLobbyUrl,
    isAuthorized,
    isPinVerified,
    hasPin,
  } = useUI();
  const { t } = useTranslation("common");
  const token = CookieStorage.get(CookieKeys.AuthToken);
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  const [isLoggin, setIsLoggin] = useState(false);

  function handleLogin() {
    if (!isAuthorized) setModalView("LOGIN_VIEW");
    else {
      if (!isPinVerified && hasPin) setModalView("PIN_VERIFICATION");
      else setModalView("NEW_PIN");
    }
    return openModal();
  }

  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  function handleRegister() {
    if (isMobile) Router.push("/register");
    else {
      setModalView("SIGN_UP_VIEW");
      return openModal();
    }
  }

  useEffect(() => {
    if (isAuthorized) {
      setIsLoggin(true);
    } else setIsLoggin(false);
  }, [isAuthorized]);

  const { template } = useUI();

  return (
    <Popover className="relative">
      <div className="background_web absolute -z-[1] top-0 w-full h-[600px]">
        {""}
      </div>
      <div className="container mx-auto px-mobile">
        <div className="relative z-20">
          <div className="flex items-center justify-between lg:px-0 pt-6 md:py-[2.2rem] lg:justify-start">
            {/* Mobile */}
            <div className="flex flex-row items-center justify-between w-full lg:hidden">
              <Image
                alt=""
                src={`/images/theme/${template}/logo-mobile.png`}
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

            {/* Desktop */}
            <div className="hidden lg:flex flex-row items-center justify-between w-full">
              <div className="flex items-center gap-5 xl:gap-[35px] h-11">
                <Link
                  href={token ? "/home" : "/"}
                  className="h-[44px] max-w-[178px] relative"
                >
                  <Image
                    alt=""
                    src={`/images/theme/${template}/logo.png`}
                    className="cursor-pointer"
                    priority
                    width={195}
                    height={65}
                    quality={100}
                    objectFit="contain"
                    objectPosition="center"
                  />
                </Link>
                <div className="w-[455px]">
                  <SearchGame
                    placeholder={t("forms:placeholder-search-game")}
                    filterPosition="left-0"
                    position="header"
                    px={false}
                  />
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
    </Popover>
  );
};

export default Header;
