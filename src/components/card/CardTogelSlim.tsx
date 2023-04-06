/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTranslation } from "next-i18next";
import { MarketType } from "@framework/types";
import moment from "moment";
import 'moment/locale/id'
import { useUI } from "@contexts/ui-context";
export interface cardTogelType {
  data: MarketType;
}
import Button from "@components/ui/button";
import IconRibbonPrize from "public/icons/ribbon-prize.svg";
import LobbyUrl from "@utils/lobby-url";
export interface cardTogelType {
  data: MarketType;
}

export const CardTogelSLim = (params: cardTogelType) => {
  const { t } = useTranslation("common");
  moment.locale("id");
  const { isPinVerified, isAuthorized, hasPin, openModal, setModalView, lobbyUrl } = useUI();

  const prize1 = params.data.main_prize?.[0]
    ? params.data.main_prize?.[0].split("")
    : [];
  const prize2 = params.data.main_prize?.[1]
    ? params.data.main_prize?.[1].split("")
    : [];
  const prize3 = params.data.main_prize?.[2]
    ? params.data.main_prize?.[2].split("")
    : [];

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const linkLobbyResultPage = LobbyUrl();

  return (
    <div
      className="cursor-pointer w-full bg-[#0B2C44] active:bg-white/5 active:lg:bg-[#0B2C44] rounded-[10px] p-5"
      market-name={params?.data.market_display}
    >
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col justify-start gap-[4px]">
            <div className="text-white text-xs leading-[15px] font-normal uppercase">
              {params.data.market_name}
            </div>
            <div className="text-white text-[20px] leading-[25px] font-bold uppercase">
              {params.data.real_market}
              {" - "}
              {params.data.period}
            </div>
          </div>
          <div className="text-white/50 text-xs font-normal leading-[15px]">
            {moment(params.data.created_at).format("dddd, DD MMM YYYY")}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px] ">
          <div className="flex flex-row items-center justify-center gap-[3px] ">
            <IconRibbonPrize />
            <span className="text-white text-sm font-bold uppercase">
              Prize 1
            </span>
          </div>
          <div className="flex flex-row space-x-2">
            {prize1.length !== 0
              ? prize1.map((item, index) => (
                <div
                  key={index}
                  className="prize-ball-1"
                >
                  <span className="prize-ball-number-1">{item}</span>
                </div>
              ))
              : "-"}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-white/5 mt-[19px] pt-[17px]">
        <div className="flex flex-row items-center justify-start gap-[7px]">
          <span className="text-white/50 text-[12px] font-normal uppercase">
            Prize 2
          </span>
          <div className="flex flex-row flex-wrap justify-center gap-[3px]">
            {prize2.length !== 0
              ? prize2.map((item, index) => (
                <div
                  key={index}
                  className="prize-ball-2-3"
                >
                  <span className="prize-ball-number-2-3">{item}</span>
                </div>
              ))
              : ["-", "-", "-", "-"].map((item, index) => (
                <div
                  key={index}
                  className="prize-ball-2-3"
                >
                  <span className="prize-ball-number-2-3">{item}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-[7px]">
          <span className="text-white/50 text-[12px] font-normal uppercase">
            Prize 3
          </span>
          <div className="flex flex-row flex-wrap justify-center gap-[3px]">
            {prize3.length !== 0
              ? prize3.map((item, index) => (
                <div
                  key={index}
                  className="prize-ball-2-3"
                >
                  <span className="prize-ball-number-2-3">{item}</span>
                </div>
              ))
              : ["-", "-", "-", "-"].map((item, index) => (
                <div
                  key={index}
                  className="prize-ball-2-3"
                >
                  <span className="prize-ball-number-2-3">{item}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-[18px] hidden lg:block">
        <Button
          onClick={() => {
            if (isPinVerified === true) {
              openInNewTab(lobbyUrl);
            } else if (!isAuthorized) {
              setModalView("LOGIN_VIEW");
              openModal();
            } else if (isAuthorized) {
              if(hasPin) setModalView("PIN_VERIFICATION");
              else setModalView("NEW_PIN");
              openModal();
            }
          }}
          type="button"
          className="bg-white/5 hover:bg-[rgba(255,255,255,0.15)] text-[12px] md:px-5 h-10 active:text-[11px] text-white rounded-[5px] cursor-pointer transition ease-in-out duration-200 focus-visible:outline-none focus:outline-none w-full font-extrabold uppercase"
        >
          {t("text-see-detail")}
        </Button>
      </div>
    </div>
  );
};
