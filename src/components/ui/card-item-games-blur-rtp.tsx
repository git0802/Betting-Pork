/* eslint-disable @next/next/no-img-element */
import { shimmer, toBase64 } from "@components/common/image";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import IconPlay from "public/icons/button-play.svg";
import React, { useEffect, useState } from "react";

interface Props {
  name: string;
  image: string;
  provider: string;
  showRTP?: boolean;
  valueRTP?: number;
  height?: string;
}

const CardItemGamesBlur = ({
  name,
  image,
  provider,
  showRTP = false,
  valueRTP,
  height,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(image);
  const { t } = useTranslation();
  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  return (
    <div
      // className="group card-games h-[124px] md:h-[168px]"
      className={`bg_card_game relative group card_games ${
        height ? height : "h-[220px] md:h-[220px]"
      }`}
    >
      <div className="relative block w-full h-full drop-shadow-none">
        <div
          className={`${
            showRTP ? "h-[110px]" : "h-[160px]"
          } md:h-[150px] relative w-full max-h-full rounded overflow-hidden`}
        >
          <Image
            alt={name}
            src={image}
            layout="fill"
            className="z-[1] w-full h-full bg-center bg-no-repeat backdrop-blur-md blur-md !rounded"
            style={{
              width: "200%",
              height: " 200%",
              borderRadius: "4px",
            }}
            quality={10}
            loading="lazy"
          />
          <Image
            alt=""
            layout="fill"
            className="z-[22] w-full h-full rounded-[3px]"
            src={imgSrc ? imgSrc : "/images/broken-image.png"}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            onError={() => {
              setImgSrc("/images/broken-image.png");
            }}
            quality={100}
            loading="lazy"
            objectFit="cover"
          />
        </div>
        <div
          className={`bg_card_detail_with_rtp_live absolute z-[23] w-full bottom-0 flex flex-col  justify-start p-2 pt-10`}
        >
          <span className="carousel-items-title hover:text-clip">{name}</span>
          <span className="carousel-items-subtitle truncate uppercase mt-1">
            {provider}
          </span>
          <div className={`${showRTP ? "h-[52px]" : ""}`}>
            <div
              className={`${showRTP ? "flex flex-col mt-[14px]" : "hidden"}`}
            >
              <div className="flex flex-row justify-between items-center">
                <span className="text-[#D3F2FFB2] text-xs font-medium">
                  RTP
                </span>
                <span
                  className="text-xs font-bold"
                  style={{
                    backgroundColor:
                      valueRTP && valueRTP < 30
                        ? "rgba(255, 92, 95, 0.15)"
                        : valueRTP && valueRTP > 70
                        ? "rgba(33, 217, 128, 0.15)"
                        : "rgba(255, 184, 0, 0.15)",
                    padding: "2px 6px",
                    borderRadius: "54px",
                    color:
                      valueRTP && valueRTP < 30
                        ? "#FF5C5F"
                        : valueRTP && valueRTP > 70
                        ? "#21D980"
                        : "#FFB800",
                  }}
                >
                  {valueRTP} %
                </span>
              </div>
            </div>
            <div
              className={`${
                showRTP ? "flex flex-col" : "hidden"
              } w-full h-[10px] rounded-full mt-[8px]`}
              style={{
                background:
                  valueRTP && valueRTP < 30
                    ? "rgba(255, 92, 95, 0.30)"
                    : valueRTP && valueRTP > 70
                    ? "rgba(33, 217, 128, 0.30)"
                    : "rgba(255, 184, 0, 0.30)",
              }}
            >
              <div
                className={`bg-rtp-live h-[20px] rounded-full transition-all`}
                style={{
                  width: `${valueRTP}%`,
                  backgroundColor:
                    valueRTP && valueRTP < 30
                      ? "#FF5C5F"
                      : valueRTP && valueRTP > 70
                      ? "#21D980"
                      : "#FFB800",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div
        className={`bg_card_game_hover opacity-0 overflow-hidden group-hover:lg:opacity-100 transition flex flex-col items-center justify-center gap-[7px] absolute z-[24] top-0 left-0 rounded-md w-full h-full text-base text-white font-medium uppercase`}
      >
        <div className="inline-flex flex-col items-center justify-center">
          <IconPlay className="w-[82px] h-[82px] overflow-hidden text-white" />
          <span className="w-[95px] mx-auto text-white font-medium leading-[20px] uppercase text-center">
            {t("common:text-play-now")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardItemGamesBlur;
