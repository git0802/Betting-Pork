/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { BiTimeFive } from "react-icons/bi";
import { MarketType } from "@framework/types";
import moment from "moment";
import "moment/locale/id";
import { useUI } from "@contexts/ui-context";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import IconArrowToRight from "public/icons/arrow-to-right.svg";
import { useDevice } from "@contexts/device-context";
import { getTemplate } from "@utils/functionutil";
import LobbyUrl from "@utils/lobby-url";
export interface cardTogelType {
  data: MarketType;
}

export const CardTogelV2 = (params: cardTogelType) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  moment.locale("id");
  const { openModal, setModalView, lobbyResultUrl, isPinVerified, isAuthorized, hasPin } = useUI();

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

  const device = useDevice();

  const showDate = (date: Date | undefined) => {
    if (moment(date).isValid()) {
      return moment(date).format("HH:mm");
    } else {
      return "--:--";
    }
  };

  return (
    <div
      className={`bg_card_togel w-full h-full flex flex-col justify-between md:aspect-auto  rounded-md border relative
      market-name={params?.data.market_display} `}
    >
      <div className="absolute z-[10] right-[14px] -top-[7px] md:-top-[10px] w-[58px] h-[75px] md:w-[78px] md:h-[99px]">
        {!device.isMobileDevice ? (
          <Image
            alt="ribbon"
            src={"/images/theme/" + getTemplate() + "/ribbon.png"}
            width={78}
            height={99}
            objectFit="contain"
          />
        ) : (
          <Image
            alt="ribbon"
            src={"/images/theme/" + getTemplate() + "/ribbon.png"}
            width={58}
            height={75}
            objectFit="cover"
          />
        )}
        <span className="flex items-center justify-center w-[48px] md:w-[54px] h-[50px] md:h-[56px] absolute bottom-0 md:bottom-2 left-[11px] md:left-5 uppercase text-xs md:text-lg font-bold">
          {params?.data.real_market}
        </span>
      </div>
      <div className="p-[14px] md:p-[18px] md:pb-[28px]">
        <div>
          <div className="flex space-x-2 items-center text-whiteDefault-50 text-[10px] md:text-xs font-medium mb-4">
            <BiTimeFive />
            <span>
              {moment(params.data.created_at).format(
                "dddd, DD MMM YYYY - HH:mm"
              )}
            </span>
          </div>
          <div className="flex flex-col space-y-[10px] md:space-y-[12px] justify-start">
            <div className="text-whiteDefault-100 text-[10px] md:text-xs leading-[10px] md:leading-[12px] font-semibold uppercase">
              {params.data.market_name}
            </div>
            <div className="text-whiteDefault-100 text-lg md:text-xl leading-[18px] md:leading-[24px] font-bold uppercase">
              {params.data.real_market}
              {" - "}
              {params.data.period}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 text-whiteDefault-50 text-xs mt-3">
            <label>Open : {showDate(params?.data?.open_hours?.[0])}</label>
            <IconArrowToRight className="text-whiteDefault-50 w-3 h-2 cursor-text" />
            <label>Close : {showDate(params?.data?.close_hours?.[0])}</label>
          </div>
        </div>
      </div>
      <div
        className={`${
          prize2.length == 0 && prize3.length == 0 ? "mb-[50px]" : "mb-[18px]"
        } flex flex-col items-center justify-center space-y-[9px] md:space-y-3 mt-0`}
      >
        <span
          className={`${
            prize2.length == 0 && prize3.length == 0
              ? "text-[14px]"
              : "text-[10px] md:text-xs"
          } text-whiteDefault-60 font-bold uppercase`}
        >
          Prize 1
        </span>
        <div className="flex flex-row gap-2">
          {prize1.length !== 0
            ? prize1.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    prize2.length == 0 && prize3.length == 0
                      ? "text-2xl w-[30px] md:w-[38px] h-[30px] md:h-[38px] "
                      : "text-lg w-[28px] md:w-[36px] h-[28px] md:h-[36px]"
                  } bg_prize flex items-center justify-center rounded-full border`}
                >
                  {item}
                </div>
              ))
            : "-"}
        </div>
      </div>
      <div
        className={`${
          prize2.length == 0 && prize3.length == 0 ? "hidden" : "grid"
        } grid-cols-2 divide_price`}
      >
        <div className="flex flex-col items-center justify-center space-y-3 p-[10px]">
          <span className="text-whiteDefault-60 text-[10px] md:text-xs font-bold uppercase">
            Prize 2
          </span>
          <div className="flex flex-row flex-wrap justify-center gap-x-[5px]">
            {prize2.length !== 0
              ? prize2.map((item, index) => (
                  <div
                    key={index}
                    className={`bg_prize flex items-center justify-center text-xs md:text-sm font-normal rounded-full w-[22px] md:w-[28px] h-[22px] md:h-[28px] border`}
                  >
                    {item}
                  </div>
                ))
              : ["-", "-", "-", "-"].map((item, index) => (
                  <div
                    key={index}
                    className={`bg_prize flex items-center justify-center text-xs md:text-sm font-normal rounded-full w-[22px] md:w-[28px] h-[22px] md:h-[28px] border`}
                  >
                    {item}
                  </div>
                ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 p-[10px]">
          <span className="text-whiteDefault-60 text-[10px] md:text-xs font-bold uppercase">
            Prize 3
          </span>
          <div className="flex flex-row flex-wrap justify-center gap-x-[5px]">
            {prize3.length !== 0
              ? prize3.map((item, index) => (
                  <div
                    key={index}
                    className={`bg_prize flex items-center justify-center text-xs md:text-sm font-normal rounded-full w-[22px] md:w-[28px] h-[22px] md:h-[28px] border`}
                  >
                    {item}
                  </div>
                ))
              : ["-", "-", "-", "-"].map((item, index) => (
                  <div
                    key={index}
                    className={`bg_prize flex items-center justify-center text-xs md:text-sm font-normal rounded-full w-[22px] md:w-[28px] h-[22px] md:h-[28px] border`}
                  >
                    {item}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className={`p-[14px] md:p-[10px]`}>
        <Button
          onClick={() => {
            if (router.asPath !== "/result-togel" && !isPinVerified) {
              router.push("/result-togel");
            } else if (router.asPath !== "/result-togel" && isPinVerified) {
              openInNewTab(lobbyResultUrl);
            } else {
              if (isPinVerified === true) {
                openInNewTab(lobbyResultUrl);
              } else if (!isAuthorized) {
                setModalView("LOGIN_VIEW");
                openModal();
              } else if (isAuthorized) {
                if(hasPin) setModalView("PIN_VERIFICATION");
                else setModalView("NEW_PIN");
                openModal();
              }
            }
          }}
          type="button"
          className={`bg_button_detail_togel text-sm md:px-5 h-[34px] lg:h-11 active:text-[13px] rounded-md cursor-pointer focus-visible:outline-none focus:outline-none w-full font-extrabold uppercase`}
        >
          {t("text-see-detail")}
        </Button>
      </div>
    </div>
  );
};
