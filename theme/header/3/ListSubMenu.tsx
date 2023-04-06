import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  IconHeaderLiveHelp,
} from "@components/icons";
import IconHeaderTransaksi from "public/icons/header/transaction.svg";
import IconHeaderPromo from "public/icons/header/promo.svg";
import IconLinkAlternative from "public/icons/header/link_alternative.svg"
import Router, { useRouter } from "next/router";
import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { useTranslation } from "next-i18next";
import { useQueryGetSosmed } from "@framework/cms/get-sosmed";

const LC = dynamic(
  () => import("@components/livechat/livechat"),
  {
    ssr: false,
  }
);

const ListSubMenu = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const token = CookieStorage.get(CookieKeys.AuthToken);
  const [showLC, setShowLC] = useState(false)
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const { data: dataSosmed } = useQueryGetSosmed();
  const getLivechat = dataSosmed?.filter((item: any) => (item.name == "livechat"));
  const getLinkAlternative = dataSosmed?.filter((item: any) => (item.name == "link_alternatif"));

  const handleActiveMenu2 = (name: string) => {
    const path = router?.asPath as string;
    const checkPath = path.includes(name);
    if (checkPath) return "submenu_item_active";
    else return "submenu_item";
  };

  function handleShowHideLC() {
    setShowLC(!showLC)
  }

  return (
    <>
      <div className="flex flex-row space-x-[1px] text-base font-medium uppercase">
        {token &&
          <a
            href={"/transaction"}
            onClick={() => {
              Router.push("/transaction");
            }}
            className={`${handleActiveMenu2("/transaction")} h-[48px] flex items-center space-x-2 cursor-pointer  active:translate-y-1 transition-all duration-200 ease-in-out`}
          >
            <IconHeaderTransaksi className="icon_subheader" />
            <span
            // className={handleActiveMenu2("/transaction")}
            >
              {t("common:text-transaction")}
            </span>
          </a>
        }
        {!token && getLinkAlternative?.[0]?.value !== "-" &&
          <a
            onClick={() => {
              if (getLinkAlternative?.[0]?.value) openInNewTab(getLinkAlternative?.[0]?.value);
              else openInNewTab("#");
            }}
            className={`submenu-item-right flex items-center space-x-2 cursor-pointer  active:translate-y-1 transition-all duration-200 ease-in-out`}
          >
            <IconLinkAlternative className="icon_subheader" />
            <span>{t("common:text-link-alternative")}</span>
          </a>
        }
        <a
          href={"/promo"}
          className={`${handleActiveMenu2("/promo")} h-[48px] flex items-center space-x-2 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out`}
        >
          <IconHeaderPromo className="icon_subheader" />
          <span
          // className={handleActiveMenu2("/promo")}
          >
            {t("common:text-promo")}
          </span>
        </a>
        <div
          onClick={() => handleShowHideLC()}
          className={`${showLC ? "submenu_item_active" : "submenu_item"} h-[48px] flex items-center space-x-2 px-4 cursor-pointer active:translate-y-1 transition-all duration-200 ease-in-out capitalize`}>
          <IconHeaderLiveHelp className="icon_subheader" />
          <div className="flex flex-col relative">
            <span className="whitespace-nowrap">
              {t("common:text-live-help")}
            </span>
          </div>
        </div>
      </div>

      {showLC &&
        <LC
          onClose={handleShowHideLC}
          license={getLivechat?.[0]?.value}
        />
      }

    </>
  );
};
export default ListSubMenu;