/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { BiTimeFive } from "react-icons/bi";
import { MarketType } from "@framework/types";
import moment from "moment";
import "moment/locale/id";
import { useUI } from "@contexts/ui-context";
import { useDevice } from "@contexts/device-context";
import { useRouter } from "next/router";
import { getTemplate } from "@utils/functionutil";
import IconArrowToRight from "public/icons/arrow-to-right.svg";
export interface cardTogelType {
  data: MarketType;
}

export const CardTogelV2Mobile = (params: cardTogelType) => {
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
      className={`bg_card_togel cursor-pointer w-full md:aspect-auto  rounded-md relative`}
      market-name={params?.data.market_display}
    >
      <div className="absolute z-[2] right-[22px] -top-[4px] w-[62px] h-[56px]">
        {!device.isMobileDevice ? (
          <Image
            alt="ribbon"
            src={"/images/theme/" + getTemplate() + "/ribbon_mobile.png"}
            width={62}
            height={84}
            quality={100}
            objectFit="contain"
          />
        ) : (
          <Image
            alt="ribbon"
            src={"/images/theme/" + getTemplate() + "/ribbon_mobile.png"}
            width={62}
            height={84}
            quality={100}
            objectFit="cover"
          />
        )}
        <span className="flex items-center justify-center px-[6px] w-[62px] h-[56px] absolute left-0 top-5 uppercase text-[16px] font-bold">
          {params?.data.real_market}
        </span>
      </div>
      <div className="p-[20px]">
        <div>
          <div className="flex space-x-2 items-center text-whiteDefault-50 text-[10px] md:text-xs font-normal mb-3">
            <BiTimeFive />
            <span>
              {moment(params.data.created_at).format(
                "dddd, DD MMM YYYY - HH:mm"
              )}
            </span>
          </div>
          <div className="flex flex-col space-y-[10px] md:space-y-[12px] justify-start">
            <div className="text-whiteDefault-100 text-[12px] leading-[12px] font-semibold uppercase">
              {params.data.market_name}
            </div>
            <div className="text-whiteDefault-100 text-[24px] leading-[24px] font-bold uppercase">
              {params.data.real_market}
              {" - "}
              {params.data.period}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 text-whiteDefault-50 text-[10px] mt-3">
          <label>Open : {showDate(params?.data?.open_hours?.[0])}</label>
          <IconArrowToRight className="text-whiteDefault-50 w-3 h-2 cursor-text" />
          <label>Close : {showDate(params?.data?.close_hours?.[0])}</label>
        </div>
        <div className="flex flex-row items-center justify-between mt-[27px]">
          <div className="flex flex-row items-center justify-center gap-[11px]">
            <span className="text-whiteDefault-60 text-[10px] leading-[14px] font-bold uppercase">
              Prize 1
            </span>
            <div className="flex flex-row gap-[3px]">
              {prize1.length !== 0
                ? prize1.map((item, index) => (
                    <div
                      key={index}
                      className={`bg_prize flex items-center justify-center rounded-full w-[34px] h-[34px] border text-base font-medium`}
                    >
                      {item}
                    </div>
                  ))
                : "-"}
            </div>
          </div>
          <div
            className={`${
              prize2.length == 0 && prize3.length == 0 ? "hidden" : "flex"
            } flex-col gap-[4px]`}
          >
            <div className="flex flex-row items-center justify-center gap-[6px]">
              <span className="text-whiteDefault-60 text-[12px] font-normal uppercase">
                Prize 2
              </span>
              <div className="flex flex-row flex-wrap justify-center gap-[2px]">
                {prize2.length !== 0
                  ? prize2.map((item, index) => (
                      <div
                        key={index}
                        className="text-[12px] text-whiteDefault-100 font-normal"
                      >
                        {item}
                      </div>
                    ))
                  : ["-", "-", "-", "-"].map((item, index) => (
                      <div
                        key={index}
                        className="text-[12px] text-whiteDefault-100 font-normal"
                      >
                        {item}
                      </div>
                    ))}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-[6px]">
              <span className="text-whiteDefault-60 text-[12px] font-normal uppercase">
                Prize 3
              </span>
              <div className="flex flex-row flex-wrap justify-center gap-[2px]">
                {prize3.length !== 0
                  ? prize3.map((item, index) => (
                      <div
                        key={index}
                        className="text-[12px] text-whiteDefault-100 font-normal"
                      >
                        {item}
                      </div>
                    ))
                  : ["-", "-", "-", "-"].map((item, index) => (
                      <div
                        key={index}
                        className="text-[12px] text-whiteDefault-100 font-normal"
                      >
                        {item}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
