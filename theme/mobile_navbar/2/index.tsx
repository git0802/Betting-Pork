/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from "react";
import {
  IconNavbarHome,
  IconNavbarPromotion,
  IconNavbarGames,
  IconNavbarDeposit,
  IconNavbarLivechat,
  IconHeaderSlot,
  IconHeaderCasino,
  IconHeaderArcade,
  IconHeaderSports,
  IconHeaderPoker,
  IconHeaderTogel,
} from "@components/icons";
import Router, { useRouter } from "next/router";
import { Transition, Popover } from "@headlessui/react";
import { useUI } from "@contexts/ui-context";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";
import LC from "@components/livechat/livechat";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import LobbyUrl from "@utils/lobby-url";

const MobileNavbar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { lobbyUrl, openModal, setModalView, isAuthorized } = useUI();
  const [showLC, setShowLC] = useState(false);

  const listGameNavbar = [
    { name: "slot", icon: IconHeaderSlot, count: 1254, link: "/product/slot" },
    { name: "casino", icon: IconHeaderCasino, count: 265, link: "/product/casino" },
    { name: "sports", icon: IconHeaderSports, count: 45, link: "/product/sport" },
    { name: "arcade", icon: IconHeaderArcade, count: 365, link: "/product/arcade" },
    { name: "poker", icon: IconHeaderPoker, count: 25, link: "/product/poker" },
    { name: "togel", icon: IconHeaderTogel, count: 325, link: "/product/togel" },
  ];

  const { data: dataSosmed } = useQueryGetSosmed();
  const getLivechat = dataSosmed?.filter(
    (item: any) => item.name == "livechat"
  );

  function handleShowHideLC() {
    setShowLC(!showLC);
  }

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // temp1
  // const btn_game_outside = "bg-white/20";
  // const btn_game_inside = "from-[#FFE087] to-[#664400]";
  // const btn_game_button = "from-[#FFCC24] to-[#FFA900]";
  // const icon_game_color = "text-white"

  // // temp2
  // const btn_game_outside = "bg-gradient-to-b from-[rgba(255,61,87,0.2)] to-[rgba(188,33,53,0.2)]";
  // const btn_game_inside = "from-[rgba(255,61,87,0.3)] to-[rgba(188,33,53,0.3)]";
  // const btn_game_button = "from-[rgba(255,61,87,1)] to-[rgba(188,33,53,1)]";
  // const icon_game_color = `text-[${style.primaryColor}]`;
  // const icon_game_type = style.primaryColor;

  const linkLobbyResultPage = LobbyUrl();

  return (
    <>
      <div className={`bg_navbar_mobile mobile-navbar`}>
        <div
          onClick={() => {
            Router.push("/home");
          }}
          className={`${(router.asPath === "/home" || router.pathname === "/") ? `mobile-navbar-item navbar_item_mobile_active` : `mobile-navbar-item navbar_item_mobile`} group`}
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
          className={`${router.asPath === "/promo" ? `mobile-navbar-item navbar_item_mobile_active` : `mobile-navbar-item navbar_item_mobile`} group`}
        >
          <div className="w-full h-6 relative flex items-center justify-center">
            <IconNavbarPromotion className="w-[16px] h-[16px] transition ease-in-out duration-[200]" />
          </div>
          <span className="mobile-navbar-item-name">
            {t("common:text-promo")}
          </span>
        </div>
        <div className="mobile-navbar-item relative">
          <Popover
            as="div"
            className="w-full flex justify-center"
          >
            {({ open }) => (
              <>
                <Popover.Button 
                  className={cn(`flex flex-col items-center justify-center transition ease-in-out duration-200 outline-none`, {
                    "btn_navbar_game": !open,
                    "btn_navbar_game_open": open
                  })}
                >
                  <IconNavbarGames 
                    className="w-[25px] h-[25px]"
                  />
                  <span className="mobile-navbar-item-name mt-[2px]">Games</span>
                    {/* className={`${icon_game_type} w-[25px] h-[25px]`}  */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease duration-0 transform"
                  enterFrom="opacity-0 translate-y-20"
                  enterTo="opacity-100 translate-y-10"
                  leave="transition ease duration-500 transform"
                  leaveFrom="opacity-100 -translate-y-50"
                  leaveTo="opacity-0 translate-y-20"
                >
                  <Popover.Panel className="mobile-navbar-menu min-w-[320px]">
                    {listGameNavbar
                      ?.filter((i) => i.name !== "togel")
                      .map((item, index) => (
                        <Popover.Panel key={item.link} as={Fragment}>
                          <a
                            className="mobile-navbar-menu-items"
                            target={item.name === "togel" ? "_blank" : "_self"}
                            rel="noreferrer"
                            href={item.link}
                          >
                            {/* <div className="w-8 h-8 gradient-navbar-mobile bg-clip-text text-transparent"> */}
                            <item.icon
                              className={`navbar_icon_game_type w-8 h-8`}
                            />
                            <span className="font-bold text-white uppercase">
                              {item.name}
                            </span>
                          </a>
                        </Popover.Panel>
                      ))}
                    {isAuthorized &&
                      listGameNavbar
                        ?.filter((i) => i.name === "togel")
                        .map((item, index) => (
                          <Popover.Panel key={item.link} as={Fragment}>
                            <a
                              className="mobile-navbar-menu-items"
                              target={item.name === "togel" ? "_blank" : "_self"}
                              rel="noreferrer"
                              href={item.name === "togel" ? linkLobbyResultPage : "#"}
                            >
                              <item.icon
                                className={`navbar_icon_game_type w-8 h-8`}
                              />
                              <span className="font-bold text-white uppercase">
                                {item.name}
                              </span>
                            </a>
                          </Popover.Panel>
                        ))}
                    {!isAuthorized &&
                      listGameNavbar
                        ?.filter((i) => i.name === "togel")
                        .map((item, index) => (
                          <Popover.Panel key={item.link} as={Fragment}>
                            <a
                              className="mobile-navbar-menu-items"
                              onClick={() => {
                                if (isAuthorized) {
                                  if (linkLobbyResultPage) openInNewTab(linkLobbyResultPage);
                                  else openInNewTab("#");
                                } else {
                                  router.push("/result-togel")
                                }
                              }}
                            >
                              <item.icon
                                className={`navbar_icon_game_type w-8 h-8`}
                              />
                              <span className="font-bold text-white uppercase">
                                {item.name}
                              </span>
                            </a>
                          </Popover.Panel>
                        ))}
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <div
          onClick={() => {
            if (isAuthorized) {
              Router.push("/wallet");
            } else {
              setModalView("LOGIN_VIEW");
              openModal();
            }
          }}
          className={`${router.asPath === "/wallet" ? `mobile-navbar-item navbar_item_mobile_active` : `mobile-navbar-item navbar_item_mobile`} group`}
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
          className={`${router.asPath === "/livechat" ? `mobile-navbar-item navbar_item_mobile_active` : `mobile-navbar-item navbar_item_mobile`} group`}
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
