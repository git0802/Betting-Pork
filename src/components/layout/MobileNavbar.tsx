/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from "react";
import {
  IconNavbarHome,
  IconNavbarPromotion,
  IconNavbarGames,
  IconNavbarDeposit,
  IconNavbarLivechat,
} from "@components/icons";
import Router, { useRouter } from "next/router";
import { Transition, Menu } from "@headlessui/react";
import IconSlot from "public/icons/navbar/slot.svg";
import IconCasino from "public/icons/navbar/casino.svg";
import IconSports from "public/icons/navbar/sport.svg";
import IconArcade from "public/icons/navbar/arcade.svg";
import IconPoker from "public/icons/navbar/poker.svg";
import Icontogel from "public/icons/navbar/togel.svg";
import { useUI } from "@contexts/ui-context";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";
import LC from "@components/livechat/livechat";
import { useTranslation } from "next-i18next";

const MobileNavbar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { lobbyUrl, openModal, setModalView, isAuthorized, isPinVerified } = useUI();
  const [showLC, setShowLC] = useState(false);

  const listGame = [
    { name: "slot", icon: IconSlot, count: 1254, link: "/product/slot" },
    { name: "casino", icon: IconCasino, count: 265, link: "/product/casino" },
    { name: "sports", icon: IconSports, count: 45, link: "/product/sport" },
    { name: "arcade", icon: IconArcade, count: 365, link: "/product/arcade" },
    { name: "poker", icon: IconPoker, count: 25, link: "/product/poker" },
    { name: "togel", icon: Icontogel, count: 325, link: "/product/togel" },
  ];

  const { data: dataSosmed } = useQueryGetSosmed();
  const getLivechat = dataSosmed?.filter(
    (item: any) => item.name == "livechat"
  );

  function handleShowHideLC() {
    setShowLC(!showLC);
  }

  return (
    <>
      <div className="mobile-navbar">
        <div
          onClick={() => {
            Router.push("/home");
          }}
          className={`${
            router.asPath === "/home" || router.asPath === "/"
              ? "mobile-navbar-item active"
              : "mobile-navbar-item"
          } group`}
        >
          <div className="w-full h-6 relative flex items-center justify-center">
            <IconNavbarHome className="w-[16px] h-[16px] transition ease-in-out duration-[200]" />
          </div>
          <span className="mobile-navbar-item-name">
            {t("common:text-home")}
          </span>
        </div>
        <div
          onClick={() => {
            Router.push("/promo");
          }}
          className={`${
            router.asPath === "/promo"
              ? "mobile-navbar-item active"
              : "mobile-navbar-item"
          } group`}
        >
          <div className="w-full h-6 relative flex items-center justify-center">
            <IconNavbarPromotion className="w-[16px] h-[16px] transition ease-in-out duration-[200]" />
          </div>
          <span className="mobile-navbar-item-name">
            {t("common:text-promo")}
          </span>
        </div>
        <div className="mobile-navbar-item relative">
          <Menu
            as="div"
            className="absolute z-10 -top-10 w-full flex justify-center"
          >
            <Menu.Button className="flex items-center justify-center">
              <div className="rounded-full h-[67px] w-[67px] p-[6px] bg-white/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFE087] to-[#664400] flex items-center justify-center">
                  <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-b from-[#FFCC24] to-[#FFA900] flex items-center justify-center">
                    <IconNavbarGames className="w-[25px] h-[25px]" />
                  </div>
                </div>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease duration-0 transform"
              enterFrom="opacity-0 translate-y-20"
              enterTo="opacity-100 -translate-y-50"
              leave="transition ease duration-500 transform"
              leaveFrom="opacity-100 -translate-y-50"
              leaveTo="opacity-0 translate-y-20"
            >
              <Menu.Items className="mobile-navbar-menu transform -translate-x-1/2 left-1/2 min-w-[320px]">
                {listGame
                  ?.filter((i) => i.name !== "togel")
                  .map((item, index) => (
                    <Menu.Items key={item.link} as={Fragment}>
                      <a
                        className="mobile-navbar-menu-items"
                        target={item.name === "togel" ? "_blank" : "_self"}
                        rel="noreferrer"
                        href={item.link}
                      >
                        {/* <div className="w-8 h-8 gradient-navbar-mobile bg-clip-text text-transparent"> */}
                        <item.icon className="w-8 h-8" />
                        <span className="font-bold text-white uppercase">
                          {item.name}
                        </span>
                      </a>
                    </Menu.Items>
                  ))}
                {isPinVerified &&
                  listGame
                    ?.filter((i) => i.name === "togel")
                    .map((item, index) => (
                      <Menu.Items key={item.link} as={Fragment}>
                        <a
                          className="mobile-navbar-menu-items"
                          target={item.name === "togel" ? "_blank" : "_self"}
                          rel="noreferrer"
                          href={item.name === "togel" ? lobbyUrl : "#"}
                        >
                          <item.icon className="w-8 h-8" />
                          <span className="font-bold text-white uppercase">
                            {item.name}
                          </span>
                        </a>
                      </Menu.Items>
                    ))}
                {!isPinVerified &&
                  listGame
                    ?.filter((i) => i.name === "togel")
                    .map((item, index) => (
                      <Menu.Items key={item.link} as={Fragment}>
                        <a
                          className="mobile-navbar-menu-items"
                          onClick={() => {
                            setModalView("LOGIN_VIEW");
                            openModal();
                          }}
                        >
                          <item.icon className="w-8 h-8" />
                          <span className="font-bold text-white uppercase">
                            {item.name}
                          </span>
                        </a>
                      </Menu.Items>
                    ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <span className="mobile-navbar-item-name mt-[28px]">Games</span>
        </div>
        <div
          onClick={() => {
            if (isPinVerified === true) {
              Router.push("/wallet");
            } else {
              setModalView("LOGIN_VIEW");
              openModal();
            }
          }}
          className={`${
            router.asPath === "/wallet"
              ? "mobile-navbar-item active"
              : "mobile-navbar-item"
          } group`}
        >
          <div className="w-full h-6 relative flex items-center justify-center">
            <IconNavbarDeposit className="w-[16px] h-[16px] transition ease-in-out duration-[200]" />
          </div>
          <span className="mobile-navbar-item-name">
            {t("common:text-wallet")}
          </span>
        </div>
        <div
          onClick={() => handleShowHideLC()}
          className={`${
            router.asPath === "/livechat"
              ? "mobile-navbar-item active"
              : "mobile-navbar-item"
          } group`}
        >
          <div className="w-full h-6 relative flex items-center justify-center">
            <IconNavbarLivechat className="w-[16px] h-[16px] transition ease-in-out duration-[200]" />
          </div>
          <span className="mobile-navbar-item-name">
            {t("common:text-livechat")}
          </span>
        </div>
      </div>

      {showLC && (
        <LC onClose={handleShowHideLC} license={getLivechat?.[0]?.value} />
      )}
    </>
  );
};

export default MobileNavbar;
