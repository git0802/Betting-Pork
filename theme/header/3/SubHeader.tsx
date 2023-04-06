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
import IconLinkAlternative from "public/icons/header/link_alternative.svg"
import Router, { useRouter } from "next/router";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";
import { Menu, Transition } from "@headlessui/react";

const LC = dynamic(
  () => import("@components/livechat/livechat"),
  {
    ssr: false,
  }
);

const SubHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const { isAuthorized, lobbyUrl } = useUI();
  // const { data } = useGetDealerQuery();
  const [showLC, setShowLC] = useState(false)
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const { data: dataSosmed } = useQueryGetSosmed();
  const getLivechat = dataSosmed?.filter((item: any) => (item.name == "livechat"));
  const getLinkAlternative = dataSosmed?.filter((item: any) => (item.name == "link_alternatif"));

  const listGame = [
    { name: "slot", icon: IconHeaderSlot, link: "/product/slot" },
    { name: "casino", icon: IconHeaderCasino, link: "/product/casino" },
    { name: "sport", icon: IconHeaderSports, link: "/product/sport" },
    { name: "arcade", icon: IconHeaderArcade, link: "/product/arcade" },
    { name: "poker", icon: IconHeaderPoker, link: "/product/poker" },
  ];

  const handleActiveMenu = (name: string) => {
    const selectedMenu = name.toLowerCase();
    if (
      (router?.pathname === "/home" || router?.pathname === "/") &&
      (selectedMenu === "beranda" || selectedMenu === "home")
    )
      return "submenu-item active";
    else if (selectedMenu == query.type) return "submenu-item active";
    else return "submenu-item";
  };
  const handleActiveMenu2 = (name: string) => {
    if (name == (router.pathname as string)) return "submenu-item-right active";
    else return "submenu-item-right";
  };

  function handleShowHideLC() {
    setShowLC(!showLC)
  }

  return (
    <div className="container mx-auto ">
      <div className="px-mobile px-desktop hidden lg:flex lg:items-start flex-row items-center md:justify-between mb-10">
        <div className="flex flex-row space-x-[1px]">
          <a
            href={isAuthorized ? "/home" : "/"}
            className={`${handleActiveMenu(t("common:text-home") as string)} flex items-center space-x-2 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out`}
            target="_self"
            rel="noreferrer"
          >
            <IconHeaderHome className="text-white w-5 h-5" />
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
              className={`${handleActiveMenu(item.name)} flex items-center space-x-2 cursor-pointer  active:translate-y-1 transition-all duration-200 ease-in-out`}
            // target={item.name === "togel" ? "_blank" : "_self"}
            // rel="noreferrer"
            >
              <item.icon className="text-white w-5 h-5" />
              <div className="flex flex-col relative group">
                <span>
                  {item.name}
                </span>
              </div>
            </a>
          ))}
          <a
            onClick={() => {
              if (isAuthorized) {
                if (lobbyUrl) openInNewTab(lobbyUrl);
                else openInNewTab("#");
              } else {
                router.push("/result-togel")
              }
            }}
            className={`${router.pathname === "/result-togel" ? "submenu-item active" : "submenu-item"} flex items-center space-x-2 cursor-pointer pl-[10px] active:translate-y-1 transition-all duration-200 ease-in-out`}
          >
            <IconHeaderTogel className="text-white w-5 h-5" />
            <div className="flex flex-col relative group">
              <span>
                togel
              </span>
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
                    className="flex flex-col relative group">
                    <span className="text-white/40 hover:text-white">
                      ...
                    </span>
                  </Menu.Button>
                  <Transition
                    enter="transition ease duration-0"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Menu.Items className="bg-user-menu mt-5 absolute z-20">
                      {isAuthorized &&
                        <Menu.Item>
                          <a
                            className={`cont-user-menu group ${router.pathname == "/transaction" && "active"
                              } `}
                            href={"/transaction"}
                          >
                            <IconHeaderTransaksi className="user-menu-icon text-inherit" />
                            <span
                              className={`${router.pathname == "/transaction"
                                ? "user-menu-name active"
                                : "user-menu-name"
                                }`}
                            >
                              {t("common:text-transaction")}
                            </span>
                          </a>

                        </Menu.Item>
                      }
                      {!isAuthorized && getLinkAlternative?.[0]?.value !== "-" &&
                        <Menu.Item>
                          <a
                            onClick={() => {
                              if (getLinkAlternative?.[0]?.value) openInNewTab(getLinkAlternative?.[0]?.value);
                              else openInNewTab("#");
                            }}
                            className={`cont-user-menu group ${router.pathname == "/transaction" && "active"
                              } `}
                          >
                            <IconLinkAlternative className="user-menu-icon text-inherit" />
                            <span
                              className="user-menu-name"
                            >
                              {t("common:text-link-alternative")}
                            </span>
                          </a>
                        </Menu.Item>
                      }
                      <Menu.Item>
                        <a
                          className={`cont-user-menu group ${router.pathname == "/promo" && "active"
                            } `}
                          href={"/promo"}
                        >
                          <IconHeaderPromo className="user-menu-icon text-inherit" />
                          <span
                            className={`${router.pathname == "/promo"
                              ? "user-menu-name active"
                              : "user-menu-name"
                              }`}
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
          {isAuthorized &&
            <a
              href={"/transaction"}
              onClick={() => {
                Router.push("/transaction");
              }}
              className={`${handleActiveMenu2("/transaction")} flex items-center space-x-2 cursor-pointer  active:translate-y-1 transition-all duration-200 ease-in-out`}
            >
              <IconHeaderTransaksi className="text-white w-5 h-5" />
              <span
              // className={handleActiveMenu2("/transaction")}
              >
                {t("common:text-transaction")}
              </span>
            </a>
          }
          {!isAuthorized && getLinkAlternative?.[0]?.value !== undefined && getLinkAlternative?.[0]?.value !== "-" &&
            <a
              onClick={() => {
                if (getLinkAlternative?.[0]?.value) openInNewTab(getLinkAlternative?.[0]?.value);
                else openInNewTab("#");
              }}
              className={`submenu-item-right flex items-center space-x-2 cursor-pointer  active:translate-y-1 transition-all duration-200 ease-in-out`}
            >
              <IconLinkAlternative className="text-white w-5 h-5" />
              <span>{t("common:text-link-alternative")}</span>
            </a>
          }
          <a
            href={"/promo"}
            className={`${handleActiveMenu2("/promo")} flex items-center space-x-2 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out`}
          >
            <IconHeaderPromo className="text-white w-5 h-5" />
            <span
            // className={handleActiveMenu2("/promo")}
            >
              {t("common:text-promo")}
            </span>
          </a>
          <div
            onClick={() => handleShowHideLC()}
            className={`${showLC ? "text-white" : "text-white/40"} hover:text-white flex items-center space-x-2 pl-4 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out capitalize`}>
            <IconHeaderLiveHelp className="text-white w-5 h-5" />
            <div className="flex flex-col relative">
              <span className="whitespace-nowrap">
                {t("common:text-live-help")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showLC &&
        <LC
          onClose={handleShowHideLC}
          license={getLivechat?.[0]?.value}
        />
      }

    </div>
  );
};
export default SubHeader;