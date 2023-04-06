import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  IconHeaderSlot,
  IconHeaderCasino,
  IconHeaderSports,
  IconHeaderArcade,
  IconHeaderPoker,
  IconHeaderTogel,
  IconHeaderLiveHelp,
  IconHeaderHome,
} from "@components/icons";
import IconHeaderTransaksi from "public/icons/header/transaction.svg";
import IconHeaderPromo from "public/icons/header/promo.svg";
import IconLinkAlternative from "public/icons/header/link_alternative.svg";
import Router, { useRouter } from "next/router";
import { useUI } from "@contexts/ui-context";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
// import { useGetDealerQuery } from "@framework/market/get-dealer-link";
import { useTranslation } from "next-i18next";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";
import { Menu, Transition } from "@headlessui/react";
import LobbyUrl from "@utils/lobby-url";

const LC = dynamic(() => import("@components/livechat/livechat"), {
  ssr: false,
});

const SubHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const { isAuthorized, isPinVerified, lobbyUrl, setModalView, openModal, hasPin } = useUI();
  const token = CookieStorage.get(CookieKeys.AuthToken);
  // const { data } = useGetDealerQuery();
  const [showLC, setShowLC] = useState(false);
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const { data: dataSosmed } = useQueryGetSosmed();
  const getLivechat = dataSosmed?.filter(
    (item: any) => item.name == "livechat"
  );
  const getLinkAlternative = dataSosmed?.filter(
    (item: any) => item.name == "link_alternatif"
  );

  const listGame = [
    { name: "slot", icon: IconHeaderSlot, link: "/product/slot" },
    { name: "casino", icon: IconHeaderCasino, link: "/product/casino" },
    { name: "sport", icon: IconHeaderSports, link: "/product/sport" },
    { name: "arcade", icon: IconHeaderArcade, link: "/product/arcade" },
    { name: "poker", icon: IconHeaderPoker, link: "/product/poker" },
  ];

  const handleActiveMenu = (name: string) => {
    const selectedMenu = name.toLowerCase();
    const path = router?.asPath as string;
    const checkPath = path.split("?");
    if (
      (checkPath?.[0] === "/home" || checkPath?.[0] === "/") &&
      (selectedMenu === "beranda" || selectedMenu === "home")
    ) return "submenu_item_active";
    else if (
      (selectedMenu === checkPath?.[0]) &&
      (selectedMenu === "/promo")
    ) return "submenu_item_active";
    else if (
      (selectedMenu === checkPath?.[0]) &&
      (selectedMenu === "/transaction")
    ) return "submenu_item_active";
    else if (selectedMenu == query.type) return "submenu_item_active";
    else return "submenu_item";
  };

  const handleActiveMenuIcons = (name: string) => {
    const selectedMenu = name.toLowerCase();
    const path = router?.asPath as string;
    const checkPath = path.split("?");
    if (
      (checkPath?.[0] === "/home" || checkPath?.[0] === "/") &&
      (selectedMenu === "beranda" || selectedMenu === "home")
    ) return "submenu_icon_active";
    else if (selectedMenu === checkPath?.[0] || selectedMenu === "/promo")
      return "submenu_icon_active";
    else if (selectedMenu === checkPath?.[0] || selectedMenu === "/transaction")
      return "submenu_icon_active";
    else if (selectedMenu == checkPath?.[0]) return "submenu_icon_active";
    else return "submenu_icon";
  };

  const handleActiveMenuDropDown = (name: string) => {
    const path = router?.asPath as string;
    const checkPath = path.includes(name);
    if (checkPath) return "cont_user_menu_active";
  };

  const handleActiveMenuDropDownItem = (name: string) => {
    const path = router?.asPath as string;
    const checkPath = path.includes(name);
    if (checkPath) return "user-menu-name active";
    else return "user-menu-name";
  };

  function handleShowHideLC() {
    setShowLC(!showLC);
  }
  
  return (
    <div className="container mx-auto ">
      <div className="hidden lg:flex lg:items-start flex-row items-center md:justify-between mb-10">
        <div className="flex flex-row space-x-[1px]">
          <a
            href={isAuthorized ? "/home" : "/"}
            className={`${handleActiveMenu(
              t("common:text-home") as string
            )}  flex items-center space-x-2 cursor-pointer`}
            target="_self"
            rel="noreferrer"
          >
            <IconHeaderHome
              className={`${handleActiveMenuIcons(t("common:text-home") as string)} w-5 h-5`}
            />
            <div className="flex flex-col relative group">
              <span
                className=""
                style={{ textShadow: "0px 3px 4px rgba(0, 0, 0, 0.2)" }}
              >
                {t("common:text-home") as string}
              </span>
            </div>
          </a>

          {listGame.map((item, index) => (
            <a
              key={item.name}
              href={item.link !== "" ? item.link : "#"}
              className={`${handleActiveMenu(
                item.name
              )} flex items-center space-x-2 cursor-pointer`}
            >
              <item.icon className={`submenu_icon w-5 h-5`} />
              <div className="flex flex-col relative group">
                <span>{item.name}</span>
              </div>
            </a>
          ))}
          <a
            onClick={() => {
              if (isPinVerified === true) {
                if (lobbyUrl !== "") openInNewTab(lobbyUrl);
                else openInNewTab("#");
              } else {
                router.push("/result-togel")
              }
            }}
            className={`${router.asPath === "/result-togel" ? "submenu_item_active" : "submenu_item"} flex items-center space-x-2 cursor-pointer pl-[10px]`}
          >
            <IconHeaderTogel
              className={`${router.asPath === "/result-togel" ? "submenu_icon_active" : "submenu_icon"} w-5 h-5`}
            />
            <div className="flex flex-col relative group">
              <span>togel</span>
            </div>
          </a>
          <div className="xl:hidden">
            <Menu
              as="a"
              className={`submenu-item relative flex items-center space-x-2 cursor-pointer pl-[10px]`}
              target="_blank"
            >
              {({ open }) => (
                <>
                  <Menu.Button
                    as="div"
                    className="flex flex-col relative group"
                  >
                    <span className="text-white/40 hover:text-white">...</span>
                  </Menu.Button>
                  <Transition
                    enter="transition ease duration-0"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Menu.Items className="bg_user_menu bg-user-menu mt-5 absolute z-20">
                      {isPinVerified && (
                        <Menu.Item>
                          <a
                            className={`${handleActiveMenuDropDown("/transaction")} cont-user-menu group `}
                            href={"/transaction"}
                          >
                            <IconHeaderTransaksi className="user-menu-icon text-inherit" />
                            <span
                              className={`${handleActiveMenuDropDownItem("/transaction")}`}
                            >
                              {t("common:text-transaction")}
                            </span>
                          </a>
                        </Menu.Item>
                      )}
                      {!isPinVerified && getLinkAlternative?.[0]?.value !== "-" && (
                        <Menu.Item>
                          <a
                            onClick={() => {
                              if (getLinkAlternative?.[0]?.value)
                                openInNewTab(getLinkAlternative?.[0]?.value);
                              else openInNewTab("#");
                            }}
                            className={`cont-user-menu cont_user_menu group `}
                          >
                            <IconLinkAlternative className="user-menu-icon text-inherit" />
                            <span className="user-menu-name">
                              {t("common:text-link-alternative")}
                            </span>
                          </a>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a
                          className={`${handleActiveMenuDropDown("/promo")} cont-user-menu cont_user_menu group`}
                          href={"/promo"}
                        >
                          <IconHeaderPromo className="user-menu-icon text-inherit" />
                          <span
                            className={`${handleActiveMenuDropDownItem("/promo")}`}
                          >
                            {t("common:text-promo")}
                          </span>
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          onClick={() => handleShowHideLC()}
                          className={`cont-user-menu group`}
                        >
                          <IconHeaderLiveHelp className="user-menu-icon text-inherit" />
                          <span className="user-menu-name">
                            {t("common:text-live-help")}
                          </span>
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
        <div className="hidden xl:flex flex-row space-x-[1px] text-base font-medium uppercase">
          {isAuthorized && (isPinVerified === true) &&
            <a
              href={"/transaction"}
              className={`${handleActiveMenu("/transaction")} flex items-center space-x-2`}
            >
              <IconHeaderTransaksi className={`${handleActiveMenuIcons("/transaction")} w-5 h-5`} />
              <span
              // className={handleActiveMenu2("/transaction")}
              >
                {t("common:text-transaction")}
              </span>
            </a>
          }
          {isAuthorized && (isPinVerified === false) &&
            <button
              onClick={() => {
                if(hasPin) setModalView("PIN_VERIFICATION");
                else setModalView("NEW_PIN");
                openModal();
              }}
              className={`${handleActiveMenu("/transaction")} flex items-center space-x-2`}
            >
              <IconHeaderTransaksi className={`${handleActiveMenuIcons("/transaction")} w-5 h-5`} />
              <span
              // className={handleActiveMenu2("/transaction")}
              >
                {t("common:text-transaction")}
              </span>
            </button>
          }
          {!isAuthorized && getLinkAlternative?.[0]?.value !== "-" && (
            <a
              onClick={() => {
                if (getLinkAlternative?.[0]?.value)
                  openInNewTab(getLinkAlternative?.[0]?.value);
                else openInNewTab("#");
              }}
              className={`submenu_item flex items-center space-x-2`}
            >
              <IconLinkAlternative className="submenu_icon w-5 h-5" />
              <span>{t("common:text-link-alternative")}</span>
            </a>
          )}
          <a
            href={"/promo"}
            className={`${handleActiveMenu("/promo")} flex items-center space-x-2 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out`}
          >
            <IconHeaderPromo className={`${handleActiveMenuIcons(t("/promo") as string)} w-5 h-5`} />
            <span
            // className={handleActiveMenu2("/promo")}
            >
              {t("common:text-promo")}
            </span>
          </a>
          <div
            onClick={() => handleShowHideLC()}
            className={`${showLC ? "submenu_item_active" : "submenu_item"} hover:text-white flex items-center space-x-2 px-4 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out capitalize`}
          >
            <IconHeaderLiveHelp className={`${showLC ? "submenu_icon_active" : "submenu_icon"} w-5 h-5`} />
            <div className="flex flex-col relative">
              <span className="whitespace-nowrap">
                {t("common:text-live-help")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showLC && (
        <LC onClose={handleShowHideLC} license={getLivechat?.[0]?.value} />
      )}

      {/* {showLC ? <Livechat show={showLC} /> : null } */}
    </div>
  );
};
export default SubHeader;
