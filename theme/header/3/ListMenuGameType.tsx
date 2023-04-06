import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui-context";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { useTranslation } from "next-i18next";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";
import LobbyUrl from "@utils/lobby-url";
import dynamic from "next/dynamic";

const IconHeaderSlot = dynamic(()=>import("public/icons/header/1/slot.svg"));
const IconHeaderCasino = dynamic(()=>import("public/icons/header/1/casino.svg"));
const IconHeaderSports = dynamic(()=>import("public/icons/header/1/sports.svg"));
const IconHeaderArcade = dynamic(()=>import("public/icons/header/1/arcades.svg"));
const IconHeaderPoker = dynamic(()=>import("public/icons/header/1/poker.svg"));
const IconHeaderTogel = dynamic(()=>import("public/icons/header/1/togel.svg"));
const IconHeaderHome = dynamic(()=>import("public/icons/header/1/home.svg"));

const ListMenuGameType = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;
  const { isAuthorized, lobbyUrl } = useUI();
  const token = CookieStorage.get(CookieKeys.AuthToken);
  const [showLC, setShowLC] = useState(false)
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const { data: dataSosmed } = useQueryGetSosmed();
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
      (router?.asPath === "/home" || router?.asPath === "/") &&
      (selectedMenu === "beranda" || selectedMenu === "home")
    )
      return "submenu_item_active";
    else if (selectedMenu == query.type) return "submenu_item_active";
    else return "submenu_item";
  };

  const handleActiveMenuIcons = (name: string) => {
    const selectedMenu = name.toLowerCase();
    if (
      (router?.asPath === "/home" || router?.asPath === "/") &&
      (selectedMenu === "beranda" || selectedMenu === "home")
    )
      return "bg-black/20";
    else if (selectedMenu == query.type) return "bg-black/20";
    else return "bg-black/20";
  };

  function handleShowHideLC() {
    setShowLC(!showLC)
  }
  
  const linkLobbyResultPage = LobbyUrl();

  return (
    <div className="flex flex-row space-x-[1px]">
      <a
        href={isAuthorized ? "/home" : "/"}
        className={`${handleActiveMenu(t("common:text-home") as string)} flex items-center space-x-2 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out`}
        target="_self"
        rel="noreferrer"
      >
        <div className={`${handleActiveMenuIcons(t("common:text-home") as string)} w-9 h-9 rounded-full flex items-center justify-center`}>
          <IconHeaderHome className="text-white w-5 h-5" />
        </div>
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
          <div className={`${handleActiveMenuIcons(item.name)} w-9 h-9 rounded-full flex items-center justify-center`}>
            <item.icon className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col relative group">
            <span>
              {item.name}
            </span>
          </div>
        </a>
      ))}
      <a
        onClick={() => {
          if (token) {
            if (linkLobbyResultPage) openInNewTab(linkLobbyResultPage);
            else openInNewTab("#");
          } else {
            router.push("/result-togel")
          }
        }}
        className={`${router.pathname === "/result-togel" ? "submenu-item-1 active" : "submenu-item-1"} flex items-center space-x-2 cursor-pointer pl-[10px] active:translate-y-1 transition-all duration-200 ease-in-out`}
      >
        <div className={`${router.pathname === "/result-togel" ? "bg-transparent" : "bg-black/20"} w-9 h-9 rounded-full flex items-center justify-center`}>
          <IconHeaderTogel className="text-white w-5 h-5" />
        </div>
        <div className="flex flex-col relative group">
          <span>
            togel
          </span>
        </div>
      </a>
      {/* <div className="xl:hidden">
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
                  {token &&
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
                  {!token && getLinkAlternative?.[0]?.value !== "-" &&
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
      </div> */}
    </div>
  );
};
export default ListMenuGameType;