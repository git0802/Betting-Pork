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
  const { lobbyUrl, openModal, setModalView, isPinVerified, isAuthorized, hasPin } = useUI();
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

  const handleActiveMenu = (name: string) => {
    const selectedMenu = name.toLowerCase();
    const path = router?.asPath as string;
    const checkPath = path.split("?");
    if (
      (checkPath?.[0] === "/home" || checkPath?.[0] === "/") &&
      (selectedMenu === "beranda" || selectedMenu === "home")
    ) return "navbar_item_mobile_active";
    else if (
      (selectedMenu === checkPath?.[0]) &&
      (selectedMenu === "/promo")
    ) return "navbar_item_mobile_active";
    else if (
      (selectedMenu === checkPath?.[0]) &&
      (selectedMenu === "/wallet")
    ) return "navbar_item_mobile_active";
    else return "navbar_item_mobile";
  };

  // temp1
  const btn_game_outside = "bg-white/20";
  const btn_game_inside = "from-[#FFE087] to-[#664400]";
  const btn_game_button = "from-[#FFCC24] to-[#FFA900]";
  const icon_game_color = "text-white"

  // // temp2
  // const btn_game_outside = "bg-gradient-to-b from-[rgba(255,61,87,0.2)] to-[rgba(188,33,53,0.2)]";
  // const btn_game_inside = "from-[rgba(255,61,87,0.3)] to-[rgba(188,33,53,0.3)]";
  // const btn_game_button = "from-[rgba(255,61,87,1)] to-[rgba(188,33,53,1)]";
  // const icon_game_color = "text-white"

  return (
    <>
      <div className={`mobile-navbar bg_navbar_mobile`}>
        <div
          onClick={() => {
            Router.push("/home");
          }}
          className={`mobile-navbar-item ${handleActiveMenu("home")} group`}
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
          className={`mobile-navbar-item ${handleActiveMenu("/promo")} group`}
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
            className="absolute z-10 -top-10 w-full flex justify-center"
          >
            {({ open }) => (
              <>
                <Popover.Button
                  // className="flex flex-col items-center justify-center"
                  className={cn('flex flex-col items-center justify-center transition ease-in-out duration-200 outline-none', {
                    "btn_navbar_game": !open,
                    "btn_navbar_game_open": open
                  })}
                >
                  <div className={`rounded-full h-[67px] w-[67px] p-[6px] ${btn_game_outside} flex items-center justify-center`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-b ${btn_game_inside} flex items-center justify-center`}>
                      <div className={`w-[54px] h-[54px] bg-gradient-to-b ${btn_game_button} rounded-full flex items-center justify-center`}>
                        <IconNavbarGames className={`${icon_game_color} w-[25px] h-[25px]`} />
                      </div>
                    </div>
                  </div>
                  <span className="mobile-navbar-item-name mt-[16px]">Games</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease duration-0 transform"
                  enterFrom="opacity-0 translate-y-20"
                  enterTo="opacity-100 -translate-y-50"
                  leave="transition ease duration-500 transform"
                  leaveFrom="opacity-100 -translate-y-50"
                  leaveTo="opacity-0 translate-y-20"
                >
                  <Popover.Panel className="mobile-navbar-menu transform -translate-x-1/2 left-1/2 min-w-[320px]">
                    {listGameNavbar
                      ?.filter((i) => i.name !== "togel")
                      .map((item, index) => (
                        <Popover.Button key={item.link} as={Fragment}>
                          <a
                            className="mobile-navbar-menu-items"
                            target={item.name === "togel" ? "_blank" : "_self"}
                            rel="noreferrer"
                            href={item.link}
                          >
                            {/* <div className="w-8 h-8 gradient-navbar-mobile bg-clip-text text-transparent"> */}
                            <item.icon className="w-8 h-8 text-yellow-400" />
                            <span className="font-bold text-white uppercase">
                              {item.name}
                            </span>
                          </a>
                        </Popover.Button>
                      ))}
                    {(isPinVerified === true) &&
                      <Popover.Button as={Fragment}>
                        <a
                          className="mobile-navbar-menu-items"
                          target="_blank"
                          rel="noreferrer"
                          href={lobbyUrl}
                        >
                          <IconHeaderTogel className="w-8 h-8 text-yellow-400" />
                          <span className="font-bold text-white uppercase">
                            togel
                          </span>
                        </a>
                      </Popover.Button>
                    }
                    {(isPinVerified === false) &&
                      <Popover.Button as={Fragment}>
                        <a
                          className="mobile-navbar-menu-items"
                          href="/result-togel"
                        >
                          <IconHeaderTogel className="w-8 h-8 text-yellow-400" />
                          <span className="font-bold text-white uppercase">
                            togel
                          </span>
                        </a>
                      </Popover.Button>
                    }
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <div
          onClick={() => {
            if (isPinVerified === true) {
              Router.push("/wallet");
            } else if (!isAuthorized) {
              setModalView("LOGIN_VIEW");
              openModal();
            } else if (isAuthorized) {
              if (hasPin === true) setModalView("PIN_VERIFICATION");
              else if (hasPin === false) setModalView("NEW_PIN");
              openModal();
            }
          }}
          className={`mobile-navbar-item ${handleActiveMenu("/wallet")} group`}
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
